import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Select, Form, Input, Checkbox } from 'antd';
import { obtenerTipoTerreno }  from '../lib/postgraphile'
import { createTerreno } from '../lib/postgraphile'
import { predios } from '../lib/postgraphile'

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const App = () => {
    const [tiposTerrenos, setTiposTerrenos] = useState([]);
    const [predio, setPredio] = useState([]);
    const [areaTerreno, setAreaTerreno] = useState('');
    const [valorComercial, setValorComercial] = useState('');
    const [idTipoTerreno, setIdTipoTerreno] = useState('');
    const [predioId, setIdPredio] = useState('');
    const [fuenteAguaCercana, setFuenteAguaCercana] = useState(false);
    const [tieneConstrucciones, setTieneConstrucciones] = useState(false);

    useEffect(() => {
        async function fetchData() {
          const data = await obtenerTipoTerreno();          
          const predio = await predios();
          setTiposTerrenos(data);
          setPredio(predio);
        }
    
        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await createTerreno(parseInt(areaTerreno), parseInt(valorComercial), parseInt(idTipoTerreno), fuenteAguaCercana, tieneConstrucciones, predioId);
        } catch (error) {
          console.log(error)
        }
      };

    return (
        <Form
            name="basic"
            
            wrapperCol={{
            span: 100,
            }}
            style={{
            maxWidth: 800,
            }}
            initialValues={{
            remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onSubmitCapture={handleSubmit}
        >
            <Form.Item
            label="Area"
            name="area"
            rules={[
                {
                required: true,
                message: 'Ingresa el area del terreno',
                },
            ]}
            >
            <Input type='number' value={areaTerreno} onChange={(e) => setAreaTerreno(e.target.value)} />
            </Form.Item>

            <Form.Item
            label="Valor Comercial"
            name="valor_comercial"
            rules={[
                {
                required: true,
                message: 'Ingresa el valor comercial',
                },
            ]}
            >
            <Input type='number' value={valorComercial} onChange={(e) => setValorComercial(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Tipo de terreno"
                name="tipo_terreno"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona el tipo de terreno'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el tipo de terreno"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={tiposTerrenos}
                    onChange={(e) => setIdTipoTerreno(e)}
                    >
                    {tiposTerrenos.map((tipoTerreno) => (
                        <Select.Option key={tipoTerreno.idTipoTerreno} value={tipoTerreno.idTipoTerreno}>
                            {tipoTerreno.tipoTerreno}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item 
                label="Fuentes de agua cerca" 
                name="fuentes_agua_cerca">
                <Checkbox
                    
                    checked={fuenteAguaCercana}
                    onChange={(e) => setFuenteAguaCercana(e.target.checked)}
                >
                </Checkbox>
            </Form.Item>
            <Form.Item
                label="¿Tiene construcciones?"
                name="tiene_construcciones"
                >
                <Checkbox 
                    checked={tieneConstrucciones}
                    onChange={(e) => setTieneConstrucciones(e.target.checked)}
                    >
                </Checkbox>
            </Form.Item>

            <Form.Item
                label="Predio"
                name="predio"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona el predio relacionado'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el predio"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={predio}
                    onChange={(e) => setIdPredio(e)}
                    >
                    {predio.map((predio) => (
                        <Select.Option key={predio.numeroPredial} value={predio.numeroPredial}>
                            {predio.nombre}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
                        
            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
        </Form>
    );
};
export default App;