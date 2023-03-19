
import {Configuration, OpenAIApi} from 'openai'

// Configure open api
const configuration = new Configuration({
  organization: "org-bkG1iAnT82djuJUy28Mxuja6",
  apiKey: "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"
})
const openai = new OpenAIApi(configuration)

const fetchChats = async (req, res) => {
  const {message} = req.body
    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: message,
            max_tokens: 200,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
};

export  {
  fetchChats,
};
