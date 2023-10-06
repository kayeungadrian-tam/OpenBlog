import type { RequestHandler } from "@sveltejs/kit";
import { error, redirect } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals, request, response }) => {

    console.log("server side add post");
    console.log(request.body);

    return new Response(
        JSON.stringify({ message: 'ok' }),
    );

    // throw redirect(303, '/');
};


const test = {
    "contents": [
        {
            "type": "header 1",
            "content": "Artificial Intelligence: A JSON Blog"
        },
        {
            "type": "paragraph",
            "content": "JSON is a lightweight data-interchange format that is easy for both humans and machines to read and write. It is often used to store and transfer data between web servers and applications. JSON is also a popular format for storing and exchanging AI data."
        },
        {
            "type": "header 2",
            "content": "Examples of JSON in AI"
        },
        {
            "type": "paragraph",
            "content": "Here are a few examples of how JSON can be used in AI"

        },
        {
            "type": "header 2",
            "content": "Benefits of using JSON in AI"
        },
        {
            "type": "paragraph",
            "content": "There are several benefits to using JSON in AI, including"

        },
        {
            "type": "header 2",
            "content": "Conclusion"
        },
        {
            "type": "paragraph",
            "content": "JSON is a lightweight, flexible, and interoperable data-interchange format that is well-suited for storing and exchanging AI data. If you are working on AI projects, consider using JSON to simplify your data handling and improve the interoperability of your systems."
        }
    ]
}

const otmes = {
    "contents": [
        {
            "type": "header 1",
            "content": "Machine Learning with JSON"
        },
        {
            "type": "paragraph",
            "content": "JSON is a lightweight, flexible, and interoperable data-interchange format that is well-suited for storing and exchanging machine learning data. JSON files can be used to store training data, model parameters, and model predictions."
        },
        {
            "type": "header 2",
            "content": "Training data"
        },
        {
            "type": "paragraph",
            "content": "JSON files can be used to store training data for machine learning models. For example, a JSON object could contain the features and labels for a machine learning model. This makes it easy to load and train machine learning models in a variety of programming languages and frameworks."
        },
        {
            "type": "header 2",
            "content": "Model parameters"
        },
        {
            "type": "paragraph",
            "content": "JSON files can also be used to store the parameters of machine learning models. This makes it easy to save and load machine learning models, and to deploy them to production. For example, a JSON file could contain the weights and biases of a deep learning model."
        },
        {
            "type": "header 2",
            "content": "Model predictions"
        },
        {
            "type": "paragraph",
            "content": "JSON files can also be used to store the predictions of machine learning models. This makes it easy to share machine learning predictions with other applications and systems. For example, a JSON file could contain the predicted output of a natural language processing model."
        },
        {
            "type": "header 2",
            "content": "Benefits of using JSON in machine learning"
        },
        {
            "type": "paragraph",
            "content": "There are several benefits to using JSON in machine learning, including"
        },
        {
            "type": "header 2",
            "content": "Conclusion"
        },
        {
            "type": "paragraph",
            "content": "JSON is a powerful and versatile data-interchange format that can be used to simplify and streamline machine learning workflows. If you are working on machine learning projects, consider using JSON to store and exchange your data."
        }
    ]
}