const { Router } = require('express')
const Link = require('../data/Link')
const router = Router()
const shortid = require('shortid');

router.post('/generate',  async (req, res) => {
  try {
    const baseUrl = process.env.BASE_URL
    const { from } = req.body

    const existing = await Link.findOne({ from })
    if (existing) return res.json({ link: existing })
    
    let code = shortid()
    const to = baseUrl + '/' + code

    const link = new Link({ code, to, from })
    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router