const crypto = require('crypto');

const DADOS_MIN = 3;
const DADOS_MAX = 80;

class Bloco {
  constructor(indice, dados, hashAnterior) {
    // Validações antes de guardar qualquer coisa
    if (!Number.isInteger(indice) || indice < 0) {
      throw new Error('O índice do bloco deve ser um número inteiro maior ou igual a zero.');
    }

    if (dados === undefined || dados === null || dados === '') {
      throw new Error('Os dados do bloco são obrigatórios.');
    }

    if (typeof dados !== 'string') {
      throw new Error('Os dados do bloco devem ser um texto (string).');
    }

    if (dados.length < DADOS_MIN) {
      throw new Error(`Os dados do bloco devem ter no mínimo ${DADOS_MIN} caracteres (recebido: ${dados.length}).`);
    }

    if (dados.length > DADOS_MAX) {
      throw new Error(`Os dados do bloco devem ter no máximo ${DADOS_MAX} caracteres (recebido: ${dados.length}).`);
    }

    if (typeof hashAnterior !== 'string' || hashAnterior.length === 0) {
      throw new Error('O hash anterior deve ser um texto não vazio (use \'0\' no bloco gênese).');
    }

    this.indice = indice;
    this.dados = dados;
    this.hashAnterior = hashAnterior;
    this.hash = this.calcularHash();
  }

  calcularHash() {
    const texto = `${this.indice}${this.dados}${this.hashAnterior}`;
    return crypto.createHash('sha256').update(texto).digest('hex');
  }
}

module.exports = Bloco;
