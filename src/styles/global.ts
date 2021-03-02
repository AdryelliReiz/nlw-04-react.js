import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --primary: ${props => props.theme.colors.primary};
        --background: ${props => props.theme.colors.background};
        --border: ${props => props.theme.colors.border};
        --gray-line: ${props => props.theme.colors.grayLine};
        --text: ${props => props.theme.colors.text};
        --text-highlight: #b3b9ff;
        --title: ${props => props.theme.colors.title};
        --red: #e83f5b;
        --green: #4cd62b;
        --blue: #5965e0;
        --blue-dark: #4953b8;
        --blue-twitter: #2aa9e0;
    }  

    @media(max-width: 1080px) {
        html{
            font-size: 93.75%;
        }
    }

    @media(max-width: 720px) {
        html{
            font-size: 87.5%;
        }
    }

    body {
        background: var(--background);
        color: var(--text);
    }

    body, input, textarea, button {
        font: 400 1rem "Inter", sans-serif;
    }

    button {
        cursor: pointer;
    }

    a {
        color: inherit;
        text-decoration: none;
    }
`;