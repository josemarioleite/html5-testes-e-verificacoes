import { JSDOM } from 'jsdom'

describe('Teste da Estrutura HTML', () => {
  let dom: JSDOM
  let document: Document

  beforeAll(() => {
    // Configura um ambiente de DOM falso usando JSDOM
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Meu Site de Teste</title>
          <style>
              /* Seus estilos CSS aqui */
          </style>
      </head>
      <body>
          <header>
              <h1>Meu Site</h1>
          </header>
          <nav>
              <a href="#">Página Inicial</a>
              <a href="#">Sobre</a>
              <a href="#">Contato</a>
          </nav>
          <section>
              <h2>Conteúdo Principal</h2>
              <p>Bem-vindo ao meu site!</p>
          </section>
      </body>
      </html>
    `)

    document = dom.window.document
  })

  it('deve ter um cabeçalho com o título correto', () => {
    const header = document.querySelector('header')
    const title = header?.querySelector('h1')

    expect(header).toBeTruthy()
    expect(title?.textContent).toBe('Meu Site')
  })

  it('deve ter links de navegação', () => {
    const navLinks = document.querySelectorAll('nav a')
    expect(navLinks.length).toBe(3)

    navLinks.forEach(link => {
      expect(link.textContent).toBeTruthy()
    })
  })

  it('deve ter uma seção principal com conteúdo', () => {
    const section = document.querySelector('section')
    const heading = section?.querySelector('h2')
    const paragraph = section?.querySelector('p')

    expect(section).toBeTruthy()
    expect(heading?.textContent).toBe('Conteúdo Principal')
    expect(paragraph?.textContent).toBe('Bem-vindo ao meu site!')
  })
})
