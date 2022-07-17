const axios = require('axios');

const tumMakaleleriGetir = async (req, res) => {
    let sayfalama = '';
    let aktifPage = 1;

    if (req.query.page) {
        sayfalama = 'page=' + req.query.page;
        aktifPage = req.query.page;
    }

    try {
        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?per_page=20&' + sayfalama);
        res.render('./makaleler/index', { makaleler: blogAPI.data, sayfalama: blogAPI.headers, aktifPage: aktifPage });
    } catch (hata) {
        /* console.log(hata.response.data);
        console.log(hata.response.status);
        console.log(hata.response.header); */
        res.json({
            mesaj: 'Hata çıktı: ' + hata.response.data,
        });
    }
};

const tekMakaleGetir = async (req, res) => {
    let makaleID = req.params.makaleID;

    try {
        const tekMakale = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts/' + makaleID);

        res.render('./makaleler/makale', { makale: tekMakale.data });
    } catch (hata) {
        res.json({
            mesaj: 'Hata çıktı: ' + hata.response.data,
        });
    }
};

const aramaYap = async (req, res) => {
    let aranacakKelime = req.body.search;

    let combining = /[\u0300-\u036F]/g;
    // console.log(aranacakKelime.normalize('NFKD').replace(combining, ''));
    aranacakKelime = aranacakKelime.normalize('NFKD').replace(combining, '');

    let sayfalama = '';
    let aktifPage = 1;

    if (req.query.page) {
        sayfalama = 'page=' + req.query.page;
        aktifPage = req.query.page;
    }

    try {
        const blogAPI = await axios.get('https://emrealtunbilek.com/wp-json/wp/v2/posts?search=' + aranacakKelime);
        res.render('./makaleler/index', { makaleler: blogAPI.data, sayfalama: blogAPI.headers, aktifPage: aktifPage });
    } catch (hata) {
        res.json({
            mesaj: 'Hata çıktı: ' + hata.response.data,
        });
    }
};

module.exports = {
    tumMakaleleriGetir,
    tekMakaleGetir,
    aramaYap,
};
