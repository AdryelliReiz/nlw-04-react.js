import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        title: string;
        colors: {
            primary: string;
            background: string;
            border:string;
            grayLine: string;
            text: string;
            title: string;
        }
    }
}