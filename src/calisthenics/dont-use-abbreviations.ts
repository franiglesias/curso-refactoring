// Regla de calistenia: No usar abreviaturas

// EJEMPLO DE VIOLACIÓN: Identificadores abreviados que oscurecen la intención
export class Cfg {
  usr: string
  pwd: string
  srv: string
  env: 'dev' | 'prod'

  constructor(u: string, p: string, s: string, e: 'dev' | 'prod') {
    this.usr = u
    this.pwd = p
    this.srv = s
    this.env = e
  }

  connStr(): string {
    return `${this.usr}:${this.pwd}@${this.srv}/${this.env}`
  }
}

/*
Ejercicio (refactorizar hacia la regla):
- Expandir nombres para transmitir la intención:
  1) Renombrar Cfg -> ApplicationConfiguration, usr -> username, pwd -> password, srv -> serverUrl, env -> environment.
  2) Reemplazar el método connStr -> toConnectionString.
  3) Agregar tipos explícitos y conceptos de dominio (p. ej., enum Environment).
- Aceptación: No quedan abreviaturas ambiguas; el código se lee como prosa.
*/
