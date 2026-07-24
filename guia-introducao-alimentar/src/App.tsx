import Layout from '@/components/Layout';
import Comecar from '@/pages/Comecar';
import Diario from '@/pages/Diario';
import Fases from '@/pages/Fases';
import Receitas from '@/pages/Receitas';
import Seguranca from '@/pages/Seguranca';
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
        <Route path="/" component={Comecar} />
        <Route path="/fases" component={Fases} />
        <Route path="/seguranca" component={Seguranca} />
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
