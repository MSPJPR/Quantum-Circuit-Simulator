let circuit = [];
let qubitStates = ['|0⟩', '|0⟩'];  // Support for two qubits

function addGate(gate) {
  circuit.push(gate);
  displayCircuit();
  simulate();
}

function resetCircuit() {
  circuit = [];
  qubitStates = ['|0⟩', '|0⟩'];
  displayCircuit();
  displayState();
}

function measure() {
  qubitStates = qubitStates.map(state => (Math.random() < 0.5 ? '|0⟩' : '|1⟩'));
  displayState();
}

function displayCircuit() {
  const display = document.getElementById('circuit-display');
  display.innerHTML = circuit.join(' → ') || 'No gates added';
}

function simulate() {
  qubitStates = ['|0⟩', '|0⟩'];
  for (let gate of circuit) {
    qubitStates = qubitStates.map(state => applyGate(state, gate));
  }
  displayState();
}

function applyGate(state, gate) {
  switch (gate) {
    case 'H':
      return state === '|0⟩' ? '|+⟩' : '|-⟩';
    case 'X':
      return state === '|0⟩' ? '|1⟩' : '|0⟩';
    case 'Y':
      return state === '|0⟩' ? 'i|1⟩' : '-i|0⟩';
    case 'Z':
      return state === '|1⟩' ? '-|1⟩' : '|0⟩';
    case 'S':
      return state === '|1⟩' ? 'i|1⟩' : '|0⟩';
    case 'T':
      return state === '|1⟩' ? 'exp(iπ/4)|1⟩' : '|0⟩';
    case 'CNOT':
      return state.includes('|1⟩') ? '|0⟩' : '|1⟩';
    default:
      return state;
  }
}

function displayState() {
  document.getElementById('state-display').textContent = qubitStates.join('  ');
}
