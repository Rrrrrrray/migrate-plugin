export default class base {
  constructor (e = {}) {
    this.e = e
    this.userId = e?.user_id
    this.model = 'Mora:Migration'
  }

  get prefix () {
    return `Mora:Migration:${this.model}:`
  }
}