import Form from "./components/Form";
import Logo from "./assets/master-chef.png";

const App = () => {
  return (
    <main className="p-4">
      <div className="flex items-center justify-center">
        <img src={Logo} alt="" className="w-16" />
        <h1 className="text-2xl uppercase font-['monaco']">Dish Delight</h1>
        <img src={Logo} alt="" className="w-16" />
      </div>

      <Form />
    </main>
  );
};

export default App;
