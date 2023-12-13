"use client"
import ClassNames from '@/utills/ClassNames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navlink = ({children, exact= false, href,activeClassName, ...props}) => {
    const path = usePathname()
    const active = exact ? path == href : path.startsWith(href)
    const classes = ClassNames(props.className, active && activeClassName)
    if(classes){
        props.className = classes
    }
    return (
            <Link href={href} {...props}>{children}</Link>
    );
};

export default Navlink;