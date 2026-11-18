const Bloco = require('./bloco');

class Blockchain {
  constructor() {
    this.cadeia = [new Bloco(0, 'Bloco gênese', '0')];
  }

  ultimoBloco() {
    return this.cadeia[this.cadeia.length - 1];
  }

  adicionar(dados) {
    // Se os dados forem inválidos, o erro do Bloco passa direto
    // e nada é colocado na cadeia.
    const novo = new Bloco(this.cadeia.length, dados, this.ultimoBloco().hash);
    this.cadeia.push(novo);
    return novo;
  }

  ehValida() {
    for (let i = 1; i < this.cadeia.length; i++) {
      const atual = this.cadeia[i];
      const anterior = this.cadeia[i - 1];

      if (atual.hash !== atual.calcularHash()) {
        return false;
      }

      if (atual.hashAnterior !== anterior.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Blockchain;
