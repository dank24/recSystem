import React from 'react'
import horror from '../images/onBoardCard/genres/horror.png'
import adventure from '../images/onBoardCard/genres/adventure.png'
import comedy from '../images/onBoardCard/genres/comedy.png'
import fantasy from '../images/onBoardCard/genres/fantasy.png'
import mystery from '../images/onBoardCard/genres/mystery.png'
import romance from '../images/onBoardCard/genres/romance.png'
const action = 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg'

export default {
    'data':{
        'genres':[
            {
                id: 1,
                name: 'Action',
                Image: action,
                description: '',
                color: '#434343'
            },
            {
                id: 2,
                name: 'Comedy',
                Image: comedy,
                description: '',
                color: '#1f1c18'
            },
            {
                id: 3,
                name: 'Mystery',
                Image: mystery,
                description: '',
                color: 'green'
            },
            {
                id: 4,
                name: 'Horror',
                Image: horror,
                description: '',
                color: 'brown'
            },
            {
                id: 5,
                name: 'Fantasty',
                Image: fantasy,
                description: '',
                color: 'purple'
            },
            {
                id: 6,
                name: 'Romance',
                Image: romance,
                description: '',
                color: 'pink'
            },
        ]
    }
}