import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
import Searchbar from "../components/Searchbar";

const Index = () => (
  <Layout>
    Welcome to Pokedex! This is your homepage. This is what i passed into layout
    props.
    <Searchbar></Searchbar>
    <InfoCard
      pokemon={{ name: "Pikachu", number: "No.25", type: ["Electric"] }}
    ></InfoCard>
  </Layout>
);

export default Index;
