
export default function popUpHTML({ name, address, rating, thumbnail }) {

    // to do: compartmentalize this in a scss file
    const thumbnailDiv = `
        <div style='
            width: 100%; 
            height: 100px;
            max-width: 200px;
            background-image: url(${thumbnail});
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            overflow: hidden;'
        >
        </div>
    `;

    const HTML = `
        <div style='
            height: 200px;
            width: 200px;
        '>
            <div>
                <h2>${name}</h2>
                <p>${address}</p>
                <p>${rating}</p>
            </div>
            ${thumbnailDiv}
        </div>
    `

    return HTML;
}