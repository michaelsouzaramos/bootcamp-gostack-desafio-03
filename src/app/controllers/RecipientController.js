import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street_name: Yup.string().required(),
      street_number: Yup.string().required(),
      street_extra: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const {
      id,
      name,
      street_name,
      street_number,
      street_extra,
      city,
      state,
      zip_code,
    } = await Recipient.create(req.body);
    return res.json({
      id,
      name,
      street_name,
      street_number,
      street_extra,
      city,
      state,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().min(1),
      street_name: Yup.string().min(1),
      street_number: Yup.string().min(1),
      street_extra: Yup.string(),
      city: Yup.string().min(1),
      state: Yup.string().min(1),
      zip_code: Yup.string().min(1),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipientId } = req.params;
    const recipient = await Recipient.findByPk(recipientId);
    const {
      id,
      name,
      street_name,
      street_number,
      street_extra,
      city,
      state,
      zip_code,
    } = await recipient.update(req.body);
    return res.json({
      id,
      name,
      street_name,
      street_number,
      street_extra,
      city,
      state,
      zip_code,
    });
  }
}

export default new RecipientController();
