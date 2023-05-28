import Form from "./components/Form";
import Heading from "./components/Heading";

const App = () => {
  return (
    <main className="max-w-xs mx-auto p-4 shadow-md mt-16 rounded-lg">
      <Heading title="Dish Delight" />
      <Form />
    </main>
  );
};

export default App;
