var expect = require('chai').expect

var ccWallet = require('cc-wallet-core')

var AssetModel = require('../src/AssetModel')
var HistoryEntryModel = require('../src/HistoryEntryModel')


describe('AssetModel', function() {
  var wallet, assetModel

  beforeEach(function(done) {
    wallet = new ccWallet({ masterKey: '12355564466111166655222222222222', testnet: true })
    assetModel = new AssetModel(wallet, wallet.getAssetDefinitionByMoniker('bitcoin'))
    wallet.fullScanAllAddresses(function(error) {
      expect(error).to.be.null
      done()
    })
  })

  afterEach(function() {
    wallet.clearStorage()
  })

  it('bitcoin AssetModel', function(done) {
    var cnt = 0
    assetModel.on('update', function() {
      if (++cnt !== 6)
        return

      expect(assetModel.getMoniker()).to.equal('bitcoin')
      expect(assetModel.getAddress()).to.equal('JNu4AFCBNmTE1@mv4jLE114t8KHL3LExNGBTXiP2dCjkaWJh')
      expect(assetModel.getUnconfirmedBalance()).to.equal('0.00000000')
      expect(assetModel.getAvailableBalance()).to.equal('0.01000000')
      expect(assetModel.getTotalBalance()).to.equal('0.01000000')
      expect(assetModel.getHistory()).to.be.instanceof(Array).with.to.have.length(1)
      expect(assetModel.getHistory()[0]).to.be.instanceof(HistoryEntryModel)

      done()
    })
    assetModel.update()
  })
})