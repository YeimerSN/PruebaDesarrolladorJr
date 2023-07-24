"use client"
import React from 'react';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { allConstruccions }  from '../lib/postgraphile'
import { deleteConstruccion }  from '../lib/postgraphile'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Area',
    dataIndex: 'area',
    key: 'area',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Num. Pisos',
    dataIndex: 'numeroPisos',
    key: 'numeroPisos',
  },
  {
    title: 'Tipo Consturccion',
    dataIndex: 'tipoConstruccion',
    key: 'tipoConstruccion',
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
    console.log(nodeId)
    deleteConstruccion(nodeId);
    window.location.reload();
  }catch(error){
    console.log(error)
  }
};

const App = () => {
  const [informacion, setInformacion] = useState('');

  useEffect(() => {
    async function fetchData() {
    const data = await allConstruccions();
    console.log(data)
    const mapData = data.map((item, index) => ({
      key: index,
      area: item.areaTotal,
      direccion: item.direccion,
      numeroPisos: item.numeroPisos,
      tipoConstruccion: item.tipoConstruccionByIdTipoContruccion.tipoConstruccion,
      predio: item.predioByPredioId.nombre,
      nodeId: item.nodeId
    }));
    setInformacion(mapData);
    }
    fetchData();
  }, []);

  const paginationConfig = {
    pageSize: 10, 
  };

  return(<Table columns={columns} dataSource={informacion} pagination={paginationConfig}/>)
};
export default App;