"use client"
import React from 'react';
import { Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { allPredios }  from '../lib/postgraphile'
import { deletePredio }  from '../lib/postgraphile'

const columns = [
  {
    title: 'Num. Predial',
    dataIndex: 'numPredial',
    key: 'numeroPredial',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Avaluo',
    dataIndex: 'avaluo',
    key: 'avaluo',
  },
  {
    title: 'Departamento',
    dataIndex: 'departamento',
    key: 'departamento',
  },
  {
    title: 'Municipio',
    dataIndex: 'municipio',
    key: 'municipio',
  },
  {
    title: 'Acción',
    key: 'accion',
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEliminar(record.nodeId)}>Eliminar <DeleteOutlined /> </a>
      </Space>
    ),
  },
];

const handleEliminar = (nodeId) => {
  try{
    deletePredio(nodeId);
    window.location.reload();
  }catch(error){
    console.log(error)
  }
};

const App = () => {
  const [informacion, setInformacion] = useState('');
  useEffect(() => {
    async function fetchData() {
    const data = await allPredios();
    console.log(data)
    const mapData = data.map((item, index) => ({
      key: index,
      numPredial: item.numeroPredial,
      avaluo: item.avaluo,
      nombre: item.nombre,
      municipio: item.municipioByMinicipioId.nombre,
      departamento: item.municipioByMinicipioId.departamentoByDepartamentoId.nombre,
      nodeId: item.nodeId
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