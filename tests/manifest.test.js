const syspath = require('path')
const { expect } = require('code')
const { run } = require('./helpers')

describe('integration: manifest', () => {
  const cwd = `${__dirname}/mock`

  it('generates correct manifest object', async () => {
    const { stdout } = await run('manifest', { cwd })
    const res = JSON.parse(stdout)
    expect(res.path).to.equal('')
    expect(res.title).to.equal('Mock')
    expect(res.description).to.be.undefined()
    expect(res.url).to.equal('/')
    expect(res.input).to.equal(syspath.resolve(__dirname, 'mock/readme.md'))
    expect(res.outputDir).to.equal('.gitdocs_build/')
    expect(res.toc.page).to.have.length(1)
    expect(res.toc.folder).to.have.length(5)
    expect(res.toc.folder[0].title).to.equal('The Foo')
    expect(res.toc.folder[0].description).to.equal('This is a test')
    expect(res.toc.folder[0].url).to.equal('/foo/')
    expect(res.breadcrumbs).to.have.length(1)
    expect(res.breadcrumbs[0].title).to.equal('Mock')
    expect(res.breadcrumbs[0].url).to.equal('/')
    expect(res.items).to.have.length(7)
    expect(res.items[0].path).to.equal('foo')
    expect(res.items[0].title).to.equal('The Foo')
    expect(res.items[0].description).to.equal('This is a test')
    expect(res.items[0].url).to.equal('/foo/')
    expect(res.items[0].input).to.equal(syspath.resolve(__dirname, 'mock/foo/index.md'))
    expect(res.items[0].outputDir).to.equal('.gitdocs_build/foo/')
    expect(res.items[0].breadcrumbs).to.have.length(2)
    expect(res.items[0].breadcrumbs[0].title).to.equal('Mock')
    expect(res.items[0].breadcrumbs[0].url).to.equal('/')
    expect(res.items[0].breadcrumbs[1].title).to.equal('The Foo')
    expect(res.items[0].breadcrumbs[1].url).to.equal('/foo/')
    expect(res.items[0].items).to.have.length(3)
    expect(res.items[1].title).to.equal('Garply')
    expect(res.items[1].items[1].draft).to.be.true()
    expect(res.items[2].title).to.equal('XYZZY')
    expect(res.items[2].items[0].draft).to.be.true()
    expect(res.items[3].title).to.equal('Thud')
    expect(res.items[3].items[0].draft).to.be.true()
    expect(res.items[4].path).to.equal('external.md')
    expect(res.items[4].title).to.equal('GitDocs')
    expect(res.items[4].url).to.equal('/gitdocs/')
    expect(res.items[4].input).to.match(/\/@repos\/gitdocs/)
    expect(res.items[4].outputDir).to.equal('.gitdocs_build/gitdocs/')
    expect(res.items[4].breadcrumbs).to.have.length(2)
    expect(res.items[4].breadcrumbs[0].title).to.equal('Mock')
    expect(res.items[4].breadcrumbs[0].url).to.equal('/')
    expect(res.items[4].breadcrumbs[1].title).to.equal('GitDocs')
    expect(res.items[4].breadcrumbs[1].url).to.equal('/gitdocs/')
    expect(res.items[4].items).to.have.length(1)
    expect(res.items[4].items[0].path).to.equal('externals.md')
    expect(res.items[4].items[0].title).to.equal('Externals')
    expect(res.items[4].items[0].url).to.equal('/gitdocs/externals/')
    expect(res.items[5].component).to.equal('Divider')
    expect(res.items[6].title).to.equal('The Quux')
    expect(res.items[6].items[0].url).to.equal('/qux/grault/')
    expect(res.items[6].items[1].url).to.equal('/qux/corge/')
    expect(res.items[6].items[0].breadcrumbs).to.have.length(3)
    expect(res.items[6].items[0].breadcrumbs[0].title).to.equal('Mock')
    expect(res.items[6].items[0].breadcrumbs[1].title).to.equal('The Quux')
    expect(res.items[6].items[0].breadcrumbs[2].title).to.equal('The Grault?')
    expect(res.items[6].items[1].breadcrumbs).to.be.undefined()
  })
})
