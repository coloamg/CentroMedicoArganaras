import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import {
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  MailOutlined,
  ControlOutlined,
  PartitionOutlined,
  UserOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  ContainerOutlined,
  MedicineBoxOutlined,
  FileAddOutlined
} from '@ant-design/icons'
import { Layout, Menu, theme, Avatar,Popover } from 'antd'

const { Header, Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const authUser = JSON.parse(sessionStorage.getItem('user'))? JSON.parse(sessionStorage.getItem('user')): "";
console.log(authUser);
const items = [
  getItem(<Link to="/home"> Home </Link>, '1', <HomeOutlined />),
  (authUser.user?.role.toUpperCase() === 'ADMIN' ||
  authUser.user?.role.toUpperCase() === 'PACIENTE') &&
  getItem(<Link>Turnos</Link>,'2',<MedicineBoxOutlined />,[
    getItem(<Link to="/historialTurnos">Turnos</Link>, '3', <ContainerOutlined />),
    getItem(<Link to="/solicitarTurno">Solicitar Turno</Link>, '4', <FileAddOutlined />),

  ]),
  authUser.user?.role.toUpperCase() === 'ADMIN' && getItem(<Link>Admin</Link>, '5', <ControlOutlined />, [
    getItem(<Link to="/usuarios">Usuarios</Link>, '6', <TeamOutlined />),
    getItem(<Link to="/roles">Roles</Link>, '7', <PartitionOutlined />),
    getItem(<Link to="/especialidades">Especialidades</Link>, '8', <PartitionOutlined />),
  ]),
  getItem(<Link to="/contact"> Contacto </Link>, '9', <TeamOutlined />, [
    getItem(<Link to="/contact/phone"> Telefono </Link>, '10', <PhoneOutlined />
    ),
    getItem(<Link to="/contact/mail"> Mail </Link>, '11', <MailOutlined />),
  ]),
  getItem(<Link>Soporte</Link>, '12', <CustomerServiceOutlined />),
]
const LogOut = () => {
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/';
  }
  return (
    <div>
      <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <LogoutOutlined /> LogOut
      </a>
    </div>
  );
};

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  console.log(authUser);
  console.log(authUser)
        if (!authUser.token) {
            console.log("no autorizado");
            window.location.href = '/notFound';
        }
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        ></Menu>
      </Sider>
      <Layout style={{ width: '100%' }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginLeft: '85%' }}>
            <h1 style={{ marginLeft: 'auto', marginRight: '0' }}>{authUser.user.firstName ? `${authUser.user.firstName}` : 'Usuario'}</h1>
            <Popover content={<LogOut />} trigger="hover" placement="bottom">
              <Avatar style={{ marginLeft: '2px', marginRight: '10px' }} size="large" icon={<UserOutlined />} />
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: '20px 16px',
          }}
        >
          <div
            style={{
              height: '100%',
              background: colorBgContainer,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  )
}
export default App
