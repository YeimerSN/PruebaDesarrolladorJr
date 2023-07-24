import Menu from '../components/menu'

const styles = {
  rootLayout: {
    display: 'flex', // Aplica flexbox al contenedor principal (body)
    flexDirection: 'row', // Los children estarán en fila (horizontalmente)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={styles.rootLayout}>
        <Menu />
        {children}
      </body>
    </html>
  );
}