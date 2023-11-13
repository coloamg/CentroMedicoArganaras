import { useEffect, useState } from 'react'
import cmService from '../../services/cmapi'
import * as React from 'react';
import { Spin, Modal, Select, Input, Checkbox } from 'antd'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import alertify from 'alertifyjs';
function Rols() {
    const authUser = JSON.parse(sessionStorage.getItem('user'));
    const [isLoading, setIsLoading] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [rols, setRols] = useState([]);
    const [rolEdit, setEditRol] = useState({});
    useEffect(() => {
        if (!authUser.token) {
            console.log("no autorizado");
            window.location.href = '/';
        }
        const fetchData = async () => {
            setIsLoading(true)
            cmService.getRoles()
                .then(res => {
                    setRols(res)
                    setIsLoading(false);
                })
                .catch(ex => {
                    setError(true, "Error al comunicarse con el servicio");
                    setIsLoading(false)
                })
        }
        fetchData()
    }, [])
    const EditOrCreateRol = (rol) => {
        console.log(rol)
        let rolEdit = rol;
        if (!rol) {
            rolEdit = {
                name: ''
            }
        }
        setEditRol(rolEdit);
        setIsEditModalOpen(true);
    }
    // const DeleteUser = (user) =>{
    //     Modal.confirm({
    //         title: 'Eliminar usuario',
    //         content: `¿Estás seguro de que deseas eliminar al usuario: ${user.firstName} ${user.lastName}?`,
    //         onOk: () => {
    //             cmService.DeleteUser(user._id)
    //                 .then(res => {
    //                     setIsLoading(true)
    //                     if (res) {
    //                         cmService.getUsers()
    //                             .then(users => {
    //                                 setUsers(users)
    //                                 setIsLoading(false)
    //                                 alertify.success('Usuario eliminado correctamente', 2);
    //                             })
    //                             .catch(ex => {
    //                                 alertify.error("Error al comunicarse con el servicio", 2);
    //                                 setIsLoading(false)
    //                             })
    //                     }
    //                 })
    //                 .catch(ex => {
    //                     alertify.error("Error al comunicarse con el servicio", 2);
    //                     setIsLoading(false)
    //                 });
    //         },
    //     });
    // }
    const handleOk = () => {
        if(rolEdit.name == ''){
            alertify.error("Error campos obligatorios vacios", 2);
            return true;
        }
        Modal.confirm({
            title: 'Confirmar edición',
            content: '¿Estás seguro de que deseas editar este rol?',
            onOk: () => {
                cmService.CreateOrUpdateRol(rolEdit)
                    .then(res => {
                        setIsLoading(true)
                        setIsEditModalOpen(false);
                        if (res) {
                            cmService.getRoles()
                                .then(rols => {
                                    setRols(rols)
                                    setIsLoading(false)
                                    alertify.success('Rol modificado correctamente', 2);
                                })
                                .catch(ex => {
                                    alertify.error("Error al comunicarse con el servicio", 2);
                                    setIsLoading(false)
                                })
                        }
                    })
                    .catch(ex => {
                        alertify.error("Error al comunicarse con el servicio", 2);
                        setIsLoading(false)
                    });
            },
        });
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditRol({
            ...rolEdit,
            [name]: value,
        });
    };
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));
    const StyiledButton = {
        'textAlign': 'right',
        margin: '10px'
    };
    return (
        <>
            {isLoading ? (
                <Spin tip="Cargando listado..." size="large">
                    <div className="content" />
                </Spin>
            ) : (
                <div style={{ 'width': '100%' }}>
                    <div style={{ textAlign: "center" }}>
                        <h1>Listado de roles</h1>
                    </div>
                    <div style={StyiledButton}>
                        <Button variant="contained" onClick={() => EditOrCreateRol()}>Alta rol</Button>
                    </div>
                    <TableContainer component={Paper} style={{ width: '60%' }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell >Nombre</StyledTableCell>
                                    <StyledTableCell>Acciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rols.map((row) => (
                                    <StyledTableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <a onClick={() => EditOrCreateRol(row)}><EditIcon /></a>
                                            <a onClick={() => DeleteUser(row)}><DeleteForeverIcon /></a>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            {
                <Modal title="Editar Rol" open={isEditModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                        <label style={{ marginRight: '8px', width: '50%' }} >Nombre:</label>
                        <Input
                            style={{ width: '50%', borderColor: rolEdit.name === '' ? 'red' : '' }}
                            required
                            type="text"
                            name="name"
                            value={rolEdit.name}
                            onChange={handleEditChange}
                        />
                    </div>
                </Modal>
            }
        </>

    )
}
export default Rols