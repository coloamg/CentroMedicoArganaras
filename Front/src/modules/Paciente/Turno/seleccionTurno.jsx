import { useEffect, useState } from 'react'
import * as React from 'react';
import { Select,Calendar} from 'antd';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import cmService from '../../../services/cmapi'

const SelectTurno  = ({ selectedData, setSelectedData })=> {
  const authUser = JSON.parse(sessionStorage.getItem('user'));
  const [especialidades, setEspecialidades] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [fecha, setValue] = useState(() => dayjs('2023-01-25'));
  useEffect(() => {
    if (!authUser.token) {
      console.log("no autorizado");
      window.location.href = '/';
    }
    const fetchData = async () => {
      cmService.getSpecialities()
        .then(esp => {
          cmService.getUsers()
            .then(users => {
              console.log(users)
              setMedicos(users
                .filter(user => user.role.name.toUpperCase() === 'MEDICO')
                .map(med => ({
                  ...med,
                  label: `${med.firstName} ${med.lastName}`,
                  value: med._id,
                }))
              );
            })
          console.log(medicos);
          setEspecialidades(esp.map((es) => ({
            label: es.name,
            value: es._id,
          })));
        })
        .catch(ex => {
          setError(true, "Error al comunicarse con el servicio");
        })
    }
    fetchData()
  }, [])
  const roleSelected = (value) => {
    setSelectedData({
      ...selectedData,
      especialidad: value,
    });
    const medFilter = medicos.filter(med => med.specialities.includes(value));
    setMedicos(medFilter);
  };
  const medicSelected = (value)=>{
    setSelectedData({
      ...selectedData,
      medico: value,
    });
  };
  const onSelect = (value) => {
    setValue(value);
    setSelectedData({
      ...selectedData,
      fecha: value.format('YYYY-MM-DD'),
    });
  };
  const onPanelChange = (newValue) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Selección de turno
      </Typography>
      <div style={{ borderBottom: '1px solid #ccc', marginBottom: '20px' }} />
      <Grid container spacing={2} style={{ alignItems: 'center' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h7" gutterBottom>
            <b>SELECCIONE ESPECIALIDAD:</b>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            onChange={roleSelected}
            showSearch
            style={{
              width: '100%',
            }}
            placeholder="Seleccione especialidad"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={especialidades}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h7" gutterBottom>
            <b>SELECCIONE MEDICO:</b>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            onChange={medicSelected}
            showSearch
            style={{
              width: '100%',
            }}
            placeholder="Seleccione medico"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={medicos}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="h7" gutterBottom>
            <b>SELECCIONE FECHA:</b>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Calendar value={fecha} onSelect={onSelect} onPanelChange={onPanelChange} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default SelectTurno;