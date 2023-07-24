import { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button, Select } from 'antd';
import { obtenerTipoDocumentos } from '../lib/postgraphile'
import { createJuridica } from '../lib/postgraphile'
import { createPersonaNatural } from '../lib/postgraphile'
import { predios } from '../lib/postgraphile'

const App = () => {
  
    const [tiposDocumentos, setTiposDocumentos] = useState([]);
    const [predio, setPredio] = useState([]);
    const [predioId, setIdPredio] = useState('');
    //Juridicos
    const [nit, setNit] = useState('');
    const [razonSocial, setRazonSocial] = useState('');
    //Naturales
    const [nombre, setNombres] = useState('');
    const [apellido, setApellidos] = useState('');
    const [idTipoDocumento, setIdTipoDocumento] = useState('');
    const [documento, setDocumento] = useState('');
    //Atributos compartidos
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        async function fetchData() {
          const data = await obtenerTipoDocumentos();
          const predio = await predios();
          setTiposDocumentos(data);
          setPredio(predio);
        }
    
        fetchData();
    }, []);

  //Estados para las personas
  const [showOptionA, setShowOptionA] = useState(false);
  const [showOptionB, setShowOptionB] = useState(false);

  const handleOptionAChange = (e) => {
    setShowOptionA(e.target.checked);
  };

  const handleOptionBChange = (e) => {
    setShowOptionB(e.target.checked);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if(showOptionA == true){
        await createPersonaNatural(direccion, email, telefono, nombre, apellido, idTipoDocumento, documento, predioId);
      }
      if(showOptionB == true){
        await createJuridica(direccion, email, telefono, nit, razonSocial, predioId);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Form onFinish={onFinish}
      name="basic"
      labelCol={{
      span: 10,
      }}
      wrapperCol={{
      span: 100,
      }}
      style={{
      maxWidth: 800,
      }}
      initialValues={{
      remember: true,
      }}
      autoComplete="off"
      onSubmitCapture={handleSubmit}
      >
      <Form.Item>
        <Checkbox checked={showOptionA} onChange={handleOptionAChange}>
          Propietarios Naturales
        </Checkbox>
      </Form.Item>

      {showOptionA && (
        <>
          <Form.Item 
            label="Nombres" 
            name="nombres"
            rules={[{
                required: true,
                message: 'Ingresa el o los nombres'
            }]}
          >
            <Input type='text' value={nombre} onChange={(e) => setNombres(e.target.value)} />
          </Form.Item>
          <Form.Item 
            label="Apellidos" 
            name="apellidos"
            rules={[{
                required: true,
                message: 'Ingresa el o los apellidos'
            }]}
          >
            <Input type='text' value={apellido} onChange={(e) => setApellidos(e.target.value)} />
          </Form.Item>

          <Form.Item
                label="Tipo de documento"
                name="tipo_documento"
                rules={[
                    {
                        required: true,
                        message: 'Selecciona el tipo de documento'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder="Selecciona el tipo de documento"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    onChange={(e) => setIdTipoDocumento(e)}
                    >
                    {tiposDocumentos.map((tiposDocumentos) => (
                        <Select.Option key={tiposDocumentos.idTipoDocumento} value={tiposDocumentos.idTipoDocumento}>
                            {tiposDocumentos.tipoDocumento}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Documento"
                name="documento"
                rules={[{
                    required: true,
                    message: 'Ingresa el numero de documento'
                }]}
            >
                <Input type='number' value={documento} onChange={(e) => setDocumento(e.target.value)} />
            </Form.Item>

        </>
      )}

      <Form.Item>
        <Checkbox checked={showOptionB} onChange={handleOptionBChange}>
          Propietarios Juridicos
        </Checkbox>
      </Form.Item>

      {showOptionB && (
        <>
          <Form.Item 
            label="Nit" 
            name="nit"
            rules={[{
                required: true,
                message: 'Ingresa el Nit'
            }]}
          >
            <Input type='text' value={nit} onChange={(e) => setNit(e.target.value)} />
          </Form.Item>
          <Form.Item 
            label="Razón social" 
            name="razon_social"
            rules={[{
                required: true,
                message: 'Ingresa la razón social'
            }]}
          >
            <Input type='text' value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} />
          </Form.Item>
        </>
      )}

      <Form.Item
        label="Direccion"
        name="direccion"
        rules={[{
            required: true,
            message: 'Ingresa la dirección'
        }]}
      >
        <Input type='text' value={direccion} onChange={(e) => setDireccion(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Telefono"
        name="telefono"
        rules={[{
            required: true,
            message: 'Ingresa el telefono'
        }]}
      >
        <Input type='number' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{
            required: true,
            message: 'Ingresa el correo'
        }]}
      >
        <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
