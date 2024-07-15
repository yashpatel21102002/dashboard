"use server"

import { PrismaClient, ScreenActivity } from "@prisma/client";

const prisma = new PrismaClient();


//Screen and Visits - most popular and least popular by visit.
export async function getMostPopularScreens() {
    const result = await prisma.screenActivity.groupBy({
        by: ['screenName'],
        _count: {
            screenName: true
        },
        orderBy: {
            _count: {
                screenName: 'desc'
            }
        }
    })

    return result.map(item => ({
        screenName: item.screenName,
        popularity: item._count.screenName
    }))
}

//screen and time 
export async function getScreenTime() {
    try {
        const result: any = await prisma.$queryRaw`
        SELECT
        "screenName",
        SUM(EXTRACT(EPOCH FROM ("endingDatetime" - "startingDatetime"))) / 3600 AS "totalScreenTime"
        FROM
        "ScreenActivity"
        GROUP BY "screenName"
        ORDER BY "totalScreenTime" DESC;
        `
        //CONVERT THE RESULT INTO DESIRED FORM
        const formattedResult = result.map((item: { screenName: any; totalScreenTime: string; }) => ({
            screenName: item.screenName,
            totalScreenTime: parseFloat(item.totalScreenTime).toFixed(3)
        }))

        return formattedResult;

    } catch (e) {
        console.log('error in calculation of screen time')
    }
}

//Screen and time - most used by time ans least used by time.

//Visit per month overall
export async function getVisitByMonth() {
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Prisma raw query to get the data grouped by month for PostgreSQL
    const result: any = await prisma.$queryRaw`
      SELECT 
        to_char("startingDatetime", 'YYYY-MM') AS month,
        COUNT(*) AS "visitCount"
      FROM 
        "ScreenActivity"
      WHERE 
        "startingDatetime" >= ${oneYearAgo} AND "startingDatetime" <= ${now}
      GROUP BY 
        to_char("startingDatetime", 'YYYY-MM')
      ORDER BY 
        month ASC;
    `;
    // Convert the result into the desired key-value format
    const formattedResult = result.map((item: { month: string; visitCount: any; }) => {
        const monthName = new Date(item.month + '-01').toLocaleString('default', { month: 'long' });
        return {
            month: monthName,
            visitCount: Number(item.visitCount) // Convert BigInt to number
        };
    });

    console.log(formattedResult)

    return formattedResult;
}


//get the most important user by the screen time
export async function getMostImportantUser() {
    try {
        const impUser: any = await prisma.$queryRaw`
        SELECT "username",
        SUM(EXTRACT (EPOCH FROM ("endingDatetime" - "startingDatetime"))) / 3600 AS "totalScreenTime"
        FROM "ScreenActivity"
        GROUP BY "username"
        ORDER BY "totalScreenTime" DESC
        `

        console.log(impUser)

        const favScreen: any = await prisma.$queryRaw`
        SELECT 
        "screenName",
        SUM(EXTRACT (EPOCH FROM ("endingDatetime" - "startingDatetime"))) / 3600 AS "totalScreenTime"
        FROM "ScreenActivity"
        where "username" = ${impUser[0].username}
        GROUP BY "screenName"
        ORDER BY "totalScreenTime" DESC
        `
        console.log(favScreen)

        const formattedFavoriteScreens = favScreen.map((screen: { screenName: any; totalScreenTime: string; }) => ({
            screenName: screen.screenName,
            totalScreenTime: parseFloat(screen.totalScreenTime).toFixed(2)
        }));

        return {
            username: impUser[0].username,
            favoriteScreen: formattedFavoriteScreens[0].screenName,
            leastfavoriteScreen: formattedFavoriteScreens[formattedFavoriteScreens.length - 1].screenName
        };

    } catch (e) {
        console.log(e, "error from getmostimportantnuser")
    }
}





