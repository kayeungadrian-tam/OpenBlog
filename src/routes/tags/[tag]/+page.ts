// laod function: getServerSideProps


export const load = async ({ params, fetch }) => {

    console.log(params);

    return {
        tag: params.tag
    }
}