const postgres = require('../database/connection').pool;

exports.post = (req, res, next) => {

    postgres.connect((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `INSERT INTO 
            public.prize_draw
          ( title, description, value, award_one_description, award_two_description, award_three_description )
            VALUES ( $1, $2, $3, $4, $5, $6 );`,
            [   req.body.title, 
                req.body.description, 
                req.body.value, 
                req.body.award_one_description, 
                req.body.award_two_description, 
                req.body.award_three_description],
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    title: req.body.title, 
                    description: req.body.description, 
                    value: req.body.value,
                    award_one_description: req.body.award_one_description, 
                    award_two_description: req.body.award_two_description, 
                    award_three_description: req.body.award_three_description
                }
                return res.status(200).send({ response })
            }
        )
    })
};

exports.getAll = (req, res, next) => {

    postgres.connect((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT * FROM public.prize_draw;`,
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(200).send({ response: results.rows })
            }
        )
    })
};

exports.getId = (req, res, next) => {

    postgres.connect((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT * FROM public.prize_draw where id = $1;`,
            [req.params.id],
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                return res.status(200).send({ response: results.rows })
            }
        )
    })
};

exports.put = (req, res, next) => {

    postgres.connect((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE public.prize_draw 
            SET 
              title = $1,
              description = $2,
              value = $3,
              award_one_description = $4,
              award_two_description = $5,
              award_three_description = $6
            WHERE 
              id = $7;`,
              [ req.body.title, 
                req.body.description, 
                req.body.value, 
                req.body.award_one_description, 
                req.body.award_two_description, 
                req.body.award_three_description, 
                req.params.id],
            (error, results) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    title: req.body.title, 
                    description: req.body.description, 
                    value: req.body.value,
                    award_one_description: req.body.award_one_description, 
                    award_two_description: req.body.award_two_description, 
                    award_three_description: req.body.award_three_description
                }
                return res.status(200).send({ response })
            }
        )
    })
};

exports.delete = (req, res, next) => {

    postgres.connect((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM public.prize_draw 
            WHERE id = $1;`,
            [req.params.id],
            (error, results) => {
                if (error) { return res.status(500).send({ error: error }) }
                conn.query(
                    `DELETE FROM public.images 
                     WHERE fk_prize_draw = $1;`,
                    [req.params.id],
                    (error, results) => {
                        conn.release();
                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            result: "Deletado com Sucesso!"
                        }
                        return res.status(200).send({ response })
                    }
                );

            }
        )
    })
};