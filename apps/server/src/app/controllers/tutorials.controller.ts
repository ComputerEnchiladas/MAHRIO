export const tutorials = (req: Request, res: Response) => {

}
export const getTutorials = (_data) => (req, res) => {
    _data.collection('tutorials').find({}).toArray()
        .then(results => {
            console.log(results)
            //res.json({tutorials: results}); 
            res.render('tutorials', {
                title: 'Tutorials',
                tutorials: results
            });
        })
        .catch(error => {
            console.error(error);
            res.json({tutorials: []}).status(500);   
        })
    }

export const createTutorial = (_data) => (req, res) => {
    res.json({ok: true});
}
export const updateTutorial = (_data) => (req, res) => {
    res.json({ok: true});
}
export const deleteTutorial = (_data) => (req, res) => {
    res.json({ok: true});
}