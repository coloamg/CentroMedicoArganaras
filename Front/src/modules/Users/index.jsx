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
function Users() {
    const authUser = JSON.parse(sessionStorage.getItem('user'));
    const { Option } = Select;
    const [isLoading, setIsLoading] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [rols, setRols] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
    const [userEdit, setEditUser] = useState({});
    const [isEspecialidadMedico, setEspecialidadMedico] = useState(false);
    const [selectedEspecialidades, setSelectedEspecialidades] = useState([]);
    const [error, setError] = useState({ isError: false, message: '' });
    useEffect(() => {
        if (!authUser.token) {
            console.log("no autorizado");
            window.location.href = '/';
        }
        const fetchData = async () => {
            setIsLoading(true)
            cmService.getUsers()
                .then(res => {
                    cmService.getRoles()
                        .then(rols => {
                            cmService.getSpecialities()
                                .then(esp => {
                                    setEspecialidades(esp.map((es)=>({
                                        label : es.name,
                                        value: es._id,
                                    })));
                                })
                            setRols(rols);
                            console.log(rols)
                        })
                    setUsers(res);
                    setIsLoading(false);
                })
                .catch(ex => {
                    setError(true, "Error al comunicarse con el servicio");
                    setIsLoading(false)
                })
        }
        fetchData()
    }, [])
    const EditOrCreateUser = (user) => {
        let userEdit = user;
        console.log(user);
        if (!user) {
            userEdit = {
                firstName: '',
                lastName: '',
                phone: '',
                isActive: true,
                role: {},
                governmentId: {
                    type: 'cuil',
                    number: '41005676'
                },
                password: '',
                especialidad:{}
            }
        }
        setEditUser(userEdit);
        setIsEditModalOpen(true);
    }
    const DeleteUser = (user) => {
        Modal.confirm({
            title: 'Eliminar usuario',
            content: `¿Estás seguro de que deseas eliminar al usuario: ${user.firstName} ${user.lastName}?`,
            onOk: () => {
                cmService.DeleteUser(user._id)
                    .then(res => {
                        setIsLoading(true)
                        if (res) {
                            cmService.getUsers()
                                .then(users => {
                                    setUsers(users)
                                    setIsLoading(false)
                                    alertify.success('Usuario eliminado correctamente', 2);
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
    }
    const handleOk = () => {
        if (userEdit.firstName == '' || userEdit.lastName == '' || userEdit.email == '') {
            alertify.error("Error campos obligatorios vacios", 2);
            return true;
        }
        Modal.confirm({
            title: 'Confirmar edición',
            content: '¿Estás seguro de que deseas editar este usuario?',
            onOk: () => {
                cmService.CreateOrUpdateUser(userEdit)
                    .then(res => {
                        setIsLoading(true)
                        setIsEditModalOpen(false);
                        if (res) {
                            cmService.getUsers()
                                .then(users => {
                                    setUsers(users)
                                    setIsLoading(false)
                                    alertify.success('Usuario modificado correctamente', 2);
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
        setEditUser({
            ...userEdit,
            [name]: value,
        });
    };
    const roleSelected = (value) => {
        userEdit.role._id = value
        setEditUser({
            ...userEdit
        })
        setEspecialidadMedico(rols.find(rol => rol._id == value).name.toUpperCase() == 'MEDICO');
    };
    const onChange = (selectedValues) => {
        setEditUser({
            ...userEdit,
            specialities: selectedValues
        })
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
                    <div style={StyiledButton}>
                        <Button variant="contained" onClick={() => EditOrCreateUser()}>Alta usuario</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Nombre</StyledTableCell>
                                    <StyledTableCell>Apellido</StyledTableCell>
                                    <StyledTableCell>Documento</StyledTableCell>
                                    <StyledTableCell>Email</StyledTableCell>
                                    <StyledTableCell>Role</StyledTableCell>
                                    <StyledTableCell>Acciones</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row) => (
                                    <StyledTableRow
                                        key={row.firstName}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <StyledTableCell component="th" scope="row">
                                            {row.firstName}
                                        </StyledTableCell>
                                        <StyledTableCell>{row.lastName}</StyledTableCell>
                                        <StyledTableCell>{row.governmentId ? row.governmentId.number : 'N/A'}</StyledTableCell>
                                        <StyledTableCell>{row.email}</StyledTableCell>
                                        <StyledTableCell>{row.role.name}</StyledTableCell>
                                        <StyledTableCell>
                                            <a onClick={() => EditOrCreateUser(row)}><EditIcon /></a>
                                            <a onClick={() => DeleteUser(row)}><DeleteForeverIcon /></a>
                                        </StyledTableCell>

                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
            <Modal title="Editar usuario" open={isEditModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                    <label style={{ marginRight: '8px', width: '50%' }} >Nombre:</label>
                    <Input
                        style={{ width: '50%', borderColor: userEdit.firstName === '' ? 'red' : '' }}
                        required
                        type="text"
                        name="firstName"
                        value={userEdit.firstName}
                        onChange={handleEditChange}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                    <label style={{ marginRight: '8px', width: '50%' }} >Apellido:</label>
                    <Input
                        style={{ width: '50%', borderColor: userEdit.lastName === '' ? 'red' : '' }}
                        required
                        type="text"
                        name="lastName"
                        value={userEdit.lastName}
                        onChange={handleEditChange}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                    <label style={{ marginRight: '8px', width: '50%' }} >Email:</label>
                    <Input
                        style={{ width: '50%', borderColor: userEdit.email === '' ? 'red' : '' }}
                        required
                        type="text"
                        name="email"
                        value={userEdit.email}
                        onChange={handleEditChange}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                    <label style={{ marginRight: '8px', width: '50%' }} >Telefono:</label>
                    <Input
                        style={{ width: '50%' }}
                        required
                        type="text"
                        name="phone"
                        value={userEdit.phone}
                        onChange={handleEditChange}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: "15px" }}>
                    <label style={{ marginRight: '8px', width: '50%' }} >Rol:</label>
                    <Select
                        style={{ width: '50%' }}
                        onChange={roleSelected}
                        name="role"
                    >
                        {rols.map((role) => (
                            <Option key={role._id} value={role._id}>
                                {role.name}
                            </Option>
                        ))}

                    </Select>
                </div>
                {isEspecialidadMedico && (
                    <div
                        style={{ display: 'flex', alignItems: 'center', marginBottom: "15px", }}>
                        <label style={{ marginRight: '8px', width: '50%' }} >Especialidad:</label>
                        <Checkbox.Group options={especialidades} onChange={onChange} value={userEdit.specialities}/>
                    </div>
                )}

            </Modal>
        </>

    )
}
export default Users