import Form from "./components/Form";
import Logo from "./assets/master-chef.png";

const App = () => {
  return (
    <main>
      <div className="flex items-center justify-center">
        <img src={Logo} alt="" className="w-16" />
        <h1 className="text-3xl">Dish Delight</h1>
      </div>

      <Form />
    </main>
  );
};

export default App;
