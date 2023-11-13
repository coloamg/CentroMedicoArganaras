import * as React from 'react';
import { useEffect, useState } from 'react'
import { ShopTwoTone } from '@ant-design/icons';
import { Select, Radio, Space } from 'antd';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Metodo de pago <Typography>Total a pagar: $10000</Typography>
      </Typography>
      <div style={{ borderBottom: '1px solid #ccc', marginBottom: '30px' }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={1}><Typography variant="h5" gutterBottom>Efectivo en el consultorio</Typography></Radio>
              <div style={{ borderBottom: '1px solid #ccc', marginBottom: '5px' }} />
              <Radio value={2}><Typography variant="h5" gutterBottom>Tarjeta crédito/débito</Typography></Radio>
            </Space>
          </Radio.Group>
        </Grid>
        {value == 2 && (
          <Grid item xs={12} md={12}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="cardNumber"
                label="Nro tarjeta"
                fullWidth
                autoComplete="cc-number"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                required
                id="expDate"
                label="Vencimiento(MM/YY)"
                fullWidth
                autoComplete="cc-exp"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                required
                id="cvv"
                label="CVV"
                helperText="Last three digits on signature strip"
                fullWidth
                autoComplete="cc-csc"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="DNI"
                label="DNI"
                fullWidth
                autoComplete="cc-dni"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="name"
                label="Nombre titular como figura en la tarjeta"
                fullWidth
                autoComplete="cc-name"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={6} style={{marginTop:'10px'}}>
              <Typography variant='h6'>Cuotas</Typography>
              <Select defaultValue="-1" style={{width:'30%'}}>
                <Option value="-1">1 ($10000)</Option>
                <Option value="10">2 10% ={'>'} ($11000)</Option>
                <Option value="20">3 20% ={'>'} ($12000)</Option>
                <Option value="30">4 30% ={'>'} ($14000)</Option>
              </Select>
            </Grid>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
}