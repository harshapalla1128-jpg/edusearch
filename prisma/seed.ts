import "dotenv/config"
import { PrismaClient, CollegeType, Exam } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  const colleges = [
    {
      name: 'IIT Bombay',
      slug: 'iit-bombay',
      location: 'Mumbai, Maharashtra',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: CollegeType.IIT,
      rating: 4.8,
      totalFees: 220000,
      established: 1958,
      naacGrade: 'A++',
      nirfRank: 3,
      overview: 'IIT Bombay is one of the most prestigious engineering institutes in India, known for world-class research and strong industry connections.',
      courses: {
        create: [
          { name: 'Computer Science & Engineering', duration: 4, fees: 220000, seats: 120, degree: 'B.Tech' },
          { name: 'Electrical Engineering', duration: 4, fees: 220000, seats: 100, degree: 'B.Tech' },
          { name: 'Mechanical Engineering', duration: 4, fees: 220000, seats: 80, degree: 'B.Tech' },
        ]
      },
      placements: {
        create: [{
          year: 2024,
          averagePackage: 2800,
          highestPackage: 12000,
          placementRate: 96,
          topRecruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'DE Shaw', 'Apple']
        }]
      },
      reviews: {
        create: [{
          authorName: 'Rahul Sharma',
          batch: 2023,
          rating: 5,
          title: 'Best decision of my life',
          body: 'IIT Bombay completely transformed my career. The professors are world class and the peer group is incredibly talented.',
          pros: 'Amazing placements, great research opportunities, strong alumni network',
          cons: 'Very competitive environment, high academic pressure'
        }]
      },
      rankCutoffs: {
        create: [
          { exam: Exam.JEE_ADVANCED, category: 'General', rankMin: 1, rankMax: 150, course: 'CSE', year: 2024 },
          { exam: Exam.JEE_ADVANCED, category: 'OBC', rankMin: 1, rankMax: 250, course: 'CSE', year: 2024 },
        ]
      }
    },
    {
      name: 'IIT Delhi',
      slug: 'iit-delhi',
      location: 'New Delhi, Delhi',
      city: 'New Delhi',
      state: 'Delhi',
      type: CollegeType.IIT,
      rating: 4.7,
      totalFees: 215000,
      established: 1961,
      naacGrade: 'A++',
      nirfRank: 2,
      overview: 'IIT Delhi is located in the heart of the capital and is renowned for its cutting-edge research, excellent faculty, and top-tier placements.',
      courses: {
        create: [
          { name: 'Computer Science & Engineering', duration: 4, fees: 215000, seats: 110, degree: 'B.Tech' },
          { name: 'Electronics & Communication', duration: 4, fees: 215000, seats: 90, degree: 'B.Tech' },
        ]
      },
      placements: {
        create: [{
          year: 2024,
          averagePackage: 2600,
          highestPackage: 11500,
          placementRate: 95,
          topRecruiters: ['Amazon', 'Google', 'Microsoft', 'Flipkart', 'McKinsey']
        }]
      },
      reviews: {
        create: [{
          authorName: 'Priya Mehta',
          batch: 2024,
          rating: 5,
          title: 'Incredible experience',
          body: 'Being at IIT Delhi gave me access to the best opportunities. The campus culture and academic rigour are unmatched.',
          pros: 'Great location, top placements, excellent labs',
          cons: 'Intense competition, limited hostel space'
        }]
      },
      rankCutoffs: {
        create: [
          { exam: Exam.JEE_ADVANCED, category: 'General', rankMin: 1, rankMax: 100, course: 'CSE', year: 2024 },
          { exam: Exam.JEE_ADVANCED, category: 'OBC', rankMin: 1, rankMax: 200, course: 'CSE', year: 2024 },
        ]
      }
    },
    {
      name: 'NIT Trichy',
      slug: 'nit-trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      type: CollegeType.NIT,
      rating: 4.5,
      totalFees: 145000,
      established: 1964,
      naacGrade: 'A++',
      nirfRank: 8,
      overview: 'NIT Trichy is consistently ranked among the top NITs in India. Known for its strong alumni network and excellent placement record.',
      courses: {
        create: [
          { name: 'Computer Science & Engineering', duration: 4, fees: 145000, seats: 120, degree: 'B.Tech' },
          { name: 'Mechanical Engineering', duration: 4, fees: 145000, seats: 120, degree: 'B.Tech' },
        ]
      },
      placements: {
        create: [{
          year: 2024,
          averagePackage: 1400,
          highestPackage: 6500,
          placementRate: 90,
          topRecruiters: ['TCS', 'Infosys', 'Wipro', 'L&T', 'Samsung']
        }]
      },
      reviews: {
        create: [{
          authorName: 'Karthik Rajan',
          batch: 2023,
          rating: 4,
          title: 'Great NIT experience',
          body: 'NIT Trichy has a wonderful campus and great faculty. Placements are solid and the alumni network is very active.',
          pros: 'Good placements, beautiful campus, affordable fees',
          cons: 'Remote location, limited city life'
        }]
      },
      rankCutoffs: {
        create: [
          { exam: Exam.JEE_MAIN, category: 'General', rankMin: 1000, rankMax: 5000, course: 'CSE', year: 2024 },
          { exam: Exam.JEE_MAIN, category: 'OBC', rankMin: 2000, rankMax: 8000, course: 'CSE', year: 2024 },
        ]
      }
    },
    {
      name: 'BITS Pilani',
      slug: 'bits-pilani',
      location: 'Pilani, Rajasthan',
      city: 'Pilani',
      state: 'Rajasthan',
      type: CollegeType.DEEMED,
      rating: 4.6,
      totalFees: 550000,
      established: 1964,
      naacGrade: 'A',
      nirfRank: 25,
      overview: 'BITS Pilani is one of the top private engineering colleges in India, famous for its PRACTICE SCHOOL program and strong entrepreneurship culture.',
      courses: {
        create: [
          { name: 'Computer Science', duration: 4, fees: 550000, seats: 120, degree: 'B.E.' },
          { name: 'Electronics & Instrumentation', duration: 4, fees: 550000, seats: 80, degree: 'B.E.' },
        ]
      },
      placements: {
        create: [{
          year: 2024,
          averagePackage: 2000,
          highestPackage: 10000,
          placementRate: 92,
          topRecruiters: ['Google', 'Microsoft', 'Adobe', 'Qualcomm', 'Tower Research']
        }]
      },
      reviews: {
        create: [{
          authorName: 'Ananya Singh',
          batch: 2024,
          rating: 5,
          title: 'Best private college in India',
          body: 'BITS Pilani is truly unique. The freedom, the culture, and the opportunities are unlike any other college.',
          pros: 'Practice School, great culture, strong alumni, excellent placements',
          cons: 'Very high fees, remote campus location'
        }]
      },
      rankCutoffs: {
        create: [
          { exam: Exam.JEE_MAIN, category: 'General', rankMin: 500, rankMax: 3000, course: 'CSE', year: 2024 },
        ]
      }
    },
    {
      name: 'VIT Vellore',
      slug: 'vit-vellore',
      location: 'Vellore, Tamil Nadu',
      city: 'Vellore',
      state: 'Tamil Nadu',
      type: CollegeType.PRIVATE,
      rating: 4.1,
      totalFees: 198000,
      established: 1984,
      naacGrade: 'A++',
      nirfRank: 11,
      overview: 'VIT Vellore is one of the largest private engineering universities in India with over 75 programs and strong international collaborations.',
      courses: {
        create: [
          { name: 'Computer Science & Engineering', duration: 4, fees: 198000, seats: 900, degree: 'B.Tech' },
          { name: 'Electronics & Communication', duration: 4, fees: 198000, seats: 400, degree: 'B.Tech' },
        ]
      },
      placements: {
        create: [{
          year: 2024,
          averagePackage: 800,
          highestPackage: 4500,
          placementRate: 85,
          topRecruiters: ['TCS', 'Cognizant', 'Capgemini', 'Zoho', 'Amazon']
        }]
      },
      reviews: {
        create: [{
          authorName: 'Deepak Kumar',
          batch: 2023,
          rating: 4,
          title: 'Good college for IT careers',
          body: 'VIT has great infrastructure and decent placements. The campus is huge and beautiful.',
          pros: 'Large campus, good placement cell, international exposure',
          cons: 'Very large batch size, average faculty quality varies'
        }]
      },
      rankCutoffs: {
        create: [
          { exam: Exam.JEE_MAIN, category: 'General', rankMin: 10000, rankMax: 80000, course: 'CSE', year: 2024 },
        ]
      }
    },
  ]

  for (const college of colleges) {
    await prisma.college.create({ data: college })
    console.log(`Created: ${college.name}`)
  }

  console.log('Seeding complete!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
  // After creating colleges, add cutoffs:
const iitBombay = await prisma.college.findUnique({ where: { slug: 'iit-bombay' } })
const iitDelhi  = await prisma.college.findUnique({ where: { slug: 'iit-delhi' } })
const nitTrichy = await prisma.college.findUnique({ where: { slug: 'nit-trichy' } })

if (iitBombay) {
  await prisma.rankCutoff.createMany({ data: [
    { collegeId: iitBombay.id, exam: 'JEE_ADVANCED', category: 'General', rankMin: 1,    rankMax: 100,  course: 'CSE',  year: 2024 },
    { collegeId: iitBombay.id, exam: 'JEE_ADVANCED', category: 'General', rankMin: 1,    rankMax: 300,  course: 'EE',   year: 2024 },
    { collegeId: iitBombay.id, exam: 'JEE_ADVANCED', category: 'OBC',     rankMin: 1,    rankMax: 500,  course: 'CSE',  year: 2024 },
    { collegeId: iitBombay.id, exam: 'JEE_ADVANCED', category: 'SC',      rankMin: 1,    rankMax: 1000, course: 'CSE',  year: 2024 },
  ]})
}
if (iitDelhi) {
  await prisma.rankCutoff.createMany({ data: [
    { collegeId: iitDelhi.id,  exam: 'JEE_ADVANCED', category: 'General', rankMin: 1,    rankMax: 80,   course: 'CSE',  year: 2024 },
    { collegeId: iitDelhi.id,  exam: 'JEE_ADVANCED', category: 'OBC',     rankMin: 1,    rankMax: 400,  course: 'CSE',  year: 2024 },
  ]})
}
if (nitTrichy) {
  await prisma.rankCutoff.createMany({ data: [
    { collegeId: nitTrichy.id, exam: 'JEE_MAIN',     category: 'General', rankMin: 1000, rankMax: 8000, course: 'CSE',  year: 2024 },
    { collegeId: nitTrichy.id, exam: 'JEE_MAIN',     category: 'OBC',     rankMin: 1000, rankMax: 15000,course: 'CSE',  year: 2024 },
  ]})
}