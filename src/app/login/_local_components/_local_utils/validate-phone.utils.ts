'use client'

export const validatePhone = (phoneNumber:string):boolean => {
    const pattern = /^(?:\+98|0098|0)?9\d{9}$/

    return pattern.test(phoneNumber)
}