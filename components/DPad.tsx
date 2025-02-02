type DPadProps = {
  nextPokemon: () => void;
  prevPokemon: () => void;
};

const DPad = ({ nextPokemon, prevPokemon }: DPadProps) => (
  <div className="dpad">
    <button className="dpad-button up"></button>
    <button className="dpad-button left" onClick={prevPokemon}></button>
    <div className="dpad-center"></div>
    <button className="dpad-button right" onClick={nextPokemon}></button>
    <button className="dpad-button down"></button>
  </div>
);

export default DPad;
