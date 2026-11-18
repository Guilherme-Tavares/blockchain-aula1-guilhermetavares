const Blockchain = require('./blockchain');

// Só mostra o que recebe: não sabe de onde a cadeia vem.
function imprimirCadeia(cadeia) {
  for (const bloco of cadeia) {
    console.log(`  #${bloco.indice} | ${bloco.dados.padEnd(45)} | hash: ${bloco.hash.slice(0, 10)}... | anterior: ${bloco.hashAnterior.slice(0, 10)}`);
  }
}

function imprimirValidade(registro) {
  console.log(`  Cadeia válida? ${registro.ehValida() ? 'SIM' : 'NÃO'}`);
}

function titulo(texto) {
  console.log(`\n=== ${texto} ===`);
}

function tentarAdicionar(registro, dados) {
  try {
    registro.adicionar(dados);
    console.log(`  [OK]   "${dados}"`);
  } catch (erro) {
    console.log(`  [ERRO] ${JSON.stringify(dados)} -> ${erro.message}`);
  }
}

const registro = new Blockchain();

// 1. Cadastro de entregas válidas
titulo('ShipBlock - 1. Cadastro de entregas');
tentarAdicionar(registro, 'Entrega E-001 para Ji-Paraná: em rota');
tentarAdicionar(registro, 'Entrega E-002 para Porto Velho: coletada');
tentarAdicionar(registro, 'Entrega E-003 para Ariquemes: entregue');
tentarAdicionar(registro, 'Entrega E-004 para Cacoal: aguardando coleta');

console.log('');
imprimirCadeia(registro.cadeia);
imprimirValidade(registro);

// 2. Dados inválidos não entram na cadeia e não derrubam o programa
titulo('ShipBlock - 2. Tentativas com dados inválidos');
tentarAdicionar(registro, '');
tentarAdicionar(registro, 'E1');
tentarAdicionar(registro, 'Entrega E-005 para Vilhena: '.padEnd(90, 'x'));
tentarAdicionar(registro, 12345);

console.log(`\n  Blocos na cadeia: ${registro.cadeia.length} (nenhum bloco inválido entrou)`);
imprimirValidade(registro);

// 3. Adulteração de uma entrega antiga
titulo('ShipBlock - 3. Adulteração da entrega #1');
console.log(`  Antes:  "${registro.cadeia[1].dados}"`);
registro.cadeia[1].dados = 'Entrega E-001 para Ji-Paraná: entregue';
console.log(`  Depois: "${registro.cadeia[1].dados}"\n`);

imprimirCadeia(registro.cadeia);
imprimirValidade(registro);
console.log('  -> O hash guardado no bloco #1 não confere mais com calcularHash().');

// Mesmo recalculando o hash do bloco adulterado, o encadeamento denuncia a fraude
registro.cadeia[1].hash = registro.cadeia[1].calcularHash();
console.log('\n  Recalculando o hash do bloco #1 para "esconder" a adulteração...');
imprimirValidade(registro);
console.log('  -> O bloco #2 ainda aponta para o hash antigo do bloco #1 (hashAnterior).');
