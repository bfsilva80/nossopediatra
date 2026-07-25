import Layout from '@/components/Layout';
import Alimentos from '@/pages/Alimentos';
import Comecando from '@/pages/Comecando';
import Diario from '@/pages/Diario';
import Duvidas from '@/pages/Duvidas';
import Emergencia from '@/pages/Emergencia';
import Fases from '@/pages/Fases';
import Inicio from '@/pages/Inicio';
import Metodos from '@/pages/Metodos';
import Receitas from '@/pages/Receitas';
import ComidaDaFamilia from '@/pages/ComidaDaFamilia';
import Cuidador from '@/pages/Cuidador';
import Mitos from '@/pages/Mitos';
import Reacao from '@/pages/Reacao';
import Relatorio from '@/pages/Relatorio';
import Seguranca from '@/pages/Seguranca';
import Sobre from '@/pages/Sobre';
import Transferir from '@/pages/Transferir';
import Treino from '@/pages/Treino';
import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

/**
 * Roteamento por hash (#/fases): o app roda em qualquer hospedagem
 * estática sem precisar de fallback de SPA no servidor.
 */
export default function App() {
  return (
    <Router hook={useHashLocation}>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Inicio} />
        <Route path="/alimentos" component={Alimentos} />
        <Route path="/fases" component={Fases} />
        <Route path="/comecando" component={Comecando} />
        <Route path="/metodos" component={Metodos} />
        <Route path="/metodos/:secao" component={Metodos} />
        <Route path="/duvidas" component={Duvidas} />
        <Route path="/seguranca" component={Seguranca} />
        <Route path="/seguranca/:secao" component={Seguranca} />
        <Route path="/emergencia" component={Emergencia} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/treino" component={Treino} />
        <Route path="/cuidador" component={Cuidador} />
        <Route path="/comida-da-familia" component={ComidaDaFamilia} />
        <Route path="/mitos" component={Mitos} />
        <Route path="/reacao" component={Reacao} />
        <Route path="/relatorio" component={Relatorio} />
        <Route path="/transferir" component={Transferir} />
        <Route path="/receitas" component={Receitas} />
        <Route path="/diario" component={Diario} />
        <Route>
          <div className="py-16 text-center">
            <h1 className="mb-2 text-2xl font-bold">Página não encontrada</h1>
            <p className="text-ink-soft">Use a navegação abaixo para voltar ao guia.</p>
          </div>
        </Route>
      </Switch>
    </Layout>
  );
}
