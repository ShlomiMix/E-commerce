import Copyrights from "../Copyrights/Copyrights";
import { Menu } from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header className="h-1">
        <Menu />
      </header>
      <main>
        <Routing />
      </main>
      <footer>
        <Copyrights />
      </footer>
    </div>
  );
}

export default Layout;
