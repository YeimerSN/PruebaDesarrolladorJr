"use client"
import React from 'react';
import { AreaChartOutlined, HomeOutlined, UsergroupAddOutlined, ToolOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Predios', 'sub1', <HomeOutlined />, [
    getItem('Opciones de predio', 'g1', null, [getItem('Crear nuevo predio', '/predio'), getItem('Listar predios', '/listarPredios')], 'group'),
  ]),
  getItem('Propietario', 'sub2', <UsergroupAddOutlined />, [
    getItem('Opciones de propietarios', 'g2', null, [getItem('Crear nuevo propietario', '/propietarios'), getItem('Listar Juridicos', '/listarJuridicos'), getItem('Listar Naturales', '/listarNaturales')], 'group'),
  ]),
  getItem('Construcciones', 'sub3', <ToolOutlined />, [
    getItem('Opciones de construcciones', 'g3', null, [getItem('Crear nueva construccion', '/construcciones'), getItem('Listar construcciones', '/listarConstrucciones')], 'group'),
  ]),
  getItem('Terrenos', 'sub4', <AreaChartOutlined />, [
    getItem('Opciones de terrenos', 'g4', null, [getItem('Crear nueva terreno', '/terrenos'), getItem('Listar terreno', '/listarTerrenos')], 'group'),
  ]),  
];
const App = () => {
  const onClick = (e) => {
    if(e.key == '/predio')
      window.location.href = "/predio";
    if(e.key == '/listarPredios')
      window.location.href = "/listarPredios";
    if(e.key == '/propietarios')
      window.location.href = "/propietarios";
    if(e.key == '/listarJuridicos')
      window.location.href = "/listarJuridicos";
    if(e.key == '/listarNaturales')
      window.location.href = "/listarNaturales";
    if(e.key == '/construcciones')
      window.location.href = "/construcciones";
    if(e.key == '/listarPropietario')
      window.location.href = "/listarPropietarios";
    if(e.key == '/listarConstrucciones')
      window.location.href = "/listarConstrucciones";
    if(e.key == '/terrenos')
      window.location.href = "/terrenos";
    if(e.key == '/listarTerrenos')
      window.location.href = "/listarTerrenos";
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};
export default App;