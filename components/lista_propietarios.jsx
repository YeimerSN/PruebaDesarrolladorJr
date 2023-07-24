"use client"
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { allJuridicas }  from '../lib/postgraphile'
import { deleteJuridica }  from '../lib/postgraphile'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Nit',
    dataIndex: 'nit',
    key: 'nit',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Razon Social',
    dataIndex: 'razonSocial',
    key: 'razonSocial',
  },
  {
    title: 'Telefono',
    dataIndex: 'telefono',
    key: 'telefono',
  },
  {
    title: 'Direccion',
    dataIndex: 'direccion',
    key: 'direccion',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Predio',
    dataIndex: 'predio',
    key: 'predio',
  },
  {
    title: 'Accion',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEliminar(record.nodeId)}>Eliminar <DeleteOutlined /> </a>
      </Space>
    ),
  },
];

const handleEliminar = (nodeId) => {
  try{
    deleteJuridica(nodeId);
    window.location.reload();
  }catch(error){
    console.log(error)
  }
};

const App = () => {
  const [informacion, setInformacion] = useState('');

  useEffect(() => {
    async function fetchData() {
    const data = await allJuridicas();
    console.log(data)
    const mapData = data.map((item, index) => ({
      key: index,
      nit: item.nit,
      razonSocial: item.razonSocial,
      telefono: item.propietarioByIdPropietario.telefono,
      direccion: item.propietarioByIdPropietario.direccion,
      email: item.propietarioByIdPropietario.email,
      nodeId: item.nodeId,
      predio: item.predioByPredioId?.nombre
    }));
    setInformacion(mapData);
    }
    fetchData();
  }, []);

  const paginationConfig = {
    pageSize: 10, 
  };

  return(<Table columns={columns} dataSource={informacion} pagination={paginationConfig} />)
};
export default App;