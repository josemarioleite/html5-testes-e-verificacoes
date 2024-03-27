import fs from 'fs'
import { JSDOM } from 'jsdom'

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => 'index.html')
}))

describe('Index.html', () => {
  let indexHtml: string
  let dom: JSDOM
  let document: Document

  beforeAll(() => {
    indexHtml = require('fs').readFileSync('index.html', 'utf-8')
    dom = new JSDOM(indexHtml)
    document = dom.window.document
  })

  it('Deve conter um cabeçalho com o texto "Meu Site"', () => {
    const header = document.querySelector('header')
    expect(header?.textContent).toContain('Meu Site')
  })

  it('Deve conter uma seção com o texto "Conteúdo Principal"', () => {
    const section = document.querySelector('section')
    expect(section?.textContent).toContain('Conteúdo Principal')
  })

  it('Deve conter três links de navegação', () => {
    const navLinks = document.querySelectorAll('nav a')
    expect(navLinks.length).toBe(3)
  })

  it('Os links de navegação devem ter os textos corretos', () => {
    const navLinks = document.querySelectorAll('nav a')
    const expectedTexts = ['Página Inicial', 'Sobre', 'Contato']
    navLinks.forEach((link, index) => {
      expect(link.textContent).toBe(expectedTexts[index])
    })
  })

  it('Os links de navegação devem ter a cor correta ao passar o mouse', () => {
    const navLinks = document.querySelectorAll('nav a')
    navLinks.forEach((link: any) => {
      const hoverEvent = new dom.window.MouseEvent('mouseover')
      link.dispatchEvent(hoverEvent)
      expect(link.style.color).toBe('rgb(255, 215, 0)') // Cor ao passar o mouse
    })
  })
})
