const Gerencianet = require('gn-api-sdk-node');

const Purchase = require('../models/Purchase');

const clientId = 'Client_Id_4e4327e045ceb277ed5f62db8c46c399c309e0bf';
const clientSecret = 'Client_Secret_bb1ad596c70e1c17089cd27ec860816670412681';

const options = {
  client_id: clientId,
  client_secret: clientSecret,
  sandbox: true,
};

module.exports = {
  async store(req, res) {
    const { name, cpf, phone_number, product_name, value } = req.body;

    if (name.length < 1 || name.length > 255 ||
      cpf.length < 11 || cpf.length > 14 ||
      phone_number.length < 10 || phone_number.length > 11 ||
      !(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/.test(name)) ||
      !(/^[0-9]*$/.test(cpf)) ||
      !(/^[1-9]{2}9?[0-9]{8}$/.test(phone_number))) {
      return res.status(400).json({ error: 'Dados inválidos.' });
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 2);

    const purchase = {
      payment: {
        banking_billet: {
          expire_at: `${expirationDate.getFullYear()}-${(expirationDate.getMonth() + 1)}-${expirationDate.getDate()}`,
          customer: {
            name,
            cpf,
            phone_number,
          },
        },
      },

      items: [
        {
          name: product_name,
          value,
        },
      ],
    };

    const gerencianet = new Gerencianet(options);

    gerencianet
      .oneStep([], purchase)
      .then(async response => {
        const purchaseData = response.data;
        const purchase = await Purchase.create({ pdf_charge_link: purchaseData.pdf.charge, charge_id: purchaseData.charge_id });
        return res.json(purchase);
      })
      .catch(() => {
        return res.status(400).json({ error: 'Não foi possível gerar o boleto. Por favor, tente novamente mais tarde.' });
      })
      .done();
  }
}