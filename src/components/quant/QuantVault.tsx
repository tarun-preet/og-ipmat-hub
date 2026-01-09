import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
import { cn } from '@/lib/utils';

interface Formula {
  name: string;
  latex: string;
  description?: string;
}

interface SubTopic {
  name: string;
  formulas: Formula[];
}

interface FormulaCategory {
  id: string;
  title: string;
  subTopics: SubTopic[];
}

const formulaData: FormulaCategory[] = [
  {
    id: 'algebra',
    title: 'Algebra',
    subTopics: [
      {
        name: 'Progression & Series',
        formulas: [
          { name: 'AP nth term', latex: '$a_n = a + (n-1)d$' },
          { name: 'AP Sum', latex: '$S_n = \\frac{n}{2}(2a + (n-1)d)$ or $\\frac{n}{2}(a + l)$' },
          { name: 'GP nth term', latex: '$a_n = ar^{n-1}$' },
          { name: 'GP Sum (finite)', latex: '$S_n = \\frac{a(r^n - 1)}{r - 1}$ for $r > 1$' },
          { name: 'GP Sum (infinite)', latex: '$S_\\infty = \\frac{a}{1-r}$ for $|r| < 1$' },
          { name: 'Arithmetic-Geometric Sum', latex: '$S_\\infty = \\frac{a}{1-r} + \\frac{dr}{(1-r)^2}$' },
          { name: 'Harmonic Progression', latex: '$n^{th} \\text{ term } = \\frac{1}{a + (n-1)d}$' },
        ]
      },
      {
        name: 'Functions & Graphs',
        formulas: [
          { name: 'Vertical Line Test', latex: 'Function if any vertical line shifts at most once' },
          { name: 'Even Function', latex: '$f(-x) = f(x)$ (Symmetric about y-axis)' },
          { name: 'Odd Function', latex: '$f(-x) = -f(x)$ (Symmetric about origin)' },
          { name: 'Polynomial Degree n', latex: 'At most $n$ real roots' },
        ]
      },
      {
        name: 'Modulus & Inequalities',
        formulas: [
          { name: 'Triangle Inequality', latex: '$|a| + |b| \\geq |a+b|$' },
          { name: 'Modulus Equations', latex: '$|x-a| = b \\Rightarrow x = a \\pm b$' },
          { name: 'AM-GM-HM Inequality', latex: '$AM \\geq GM \\geq HM$' },
        ]
      },
      {
        name: 'Quadratic & Higher Degrees',
        formulas: [
          { name: 'Discriminant', latex: '$D = b^2 - 4ac$', description: 'D > 0: Real/Distinct; D = 0: Real/Equal; D < 0: Imaginary' },
          { name: 'Cubic Sums', latex: '$\\sum \\alpha = -b/a, \\sum \\alpha\\beta = c/a, \\alpha\\beta\\gamma = -d/a$' },
          { name: 'Condition for Common Root', latex: '$(c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1)$' },
          { name: 'Descartes Rule of Signs', latex: 'Max positive roots = number of sign changes in f(x)' },
        ]
      },
      {
        name: 'Linear Equations',
        formulas: [
          { name: 'Slope-Intercept Form', latex: '$y = mx + c$' },
          { name: 'Point-Slope Form', latex: '$y - y_1 = m(x - x_1)$' },
        ]
      },
      {
        name: 'Indices & Identities',
        formulas: [
          { name: 'Product Rule', latex: '$a^m \\cdot a^n = a^{m+n}$' },
          { name: 'Quotient Rule', latex: '$\\frac{a^m}{a^n} = a^{m-n}$' },
          { name: 'Power Rule', latex: '$(a^m)^n = a^{mn}$' },
          { name: 'Square of Sum', latex: '$(a+b)^2 = a^2 + 2ab + b^2$' },
          { name: 'Square of Difference', latex: '$(a-b)^2 = a^2 - 2ab + b^2$' },
          { name: 'Difference of Squares', latex: '$a^2 - b^2 = (a+b)(a-b)$' },
          { name: 'Cube of Sum', latex: '$a^3 + b^3 = (a+b)(a^2 - ab + b^2)$' },
        ]
      },
      {
        name: 'Minima & Maxima',
        formulas: [
          { name: 'Vertex of Parabola', latex: '$x = -\\frac{b}{2a}$' },
          { name: 'Discriminant for Extrema', latex: 'Use $f\'(x) = 0$' },
        ]
      }
    ]
  },
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    subTopics: [
      {
        name: 'Ratio, Proportion & Variation',
        formulas: [
          { name: 'Ratio Componendo', latex: 'If $\\frac{a}{b} = \\frac{c}{d}$, then $\\frac{a+b}{c+d}$' },
          { name: 'Variation (Combining)', latex: 'If $A \\propto B$, then $A = k \\cdot B$' },
          { name: '4th Proportion', latex: 'If $a:b::c:x$, then $x = \\frac{bc}{a}$' },
          { name: '3rd Proportion', latex: 'If $a:b::b:x$, then $x = \\frac{b^2}{a}$' },
          { name: 'Continued Proportion', latex: 'If $a:b::b:c$, then $x = \\sqrt{ac}$' },
          { name: 'Duplicate Ratio', latex: 'Ratio $a:b$ → $a^2:b^2$' },
          { name: 'Triplicate Ratio', latex: 'Cubing ratio' },
          { name: 'Sub-duplicate Ratio', latex: 'Square root' },
          { name: 'Sub-triplicate Ratio', latex: 'Cube root' },
          { name: 'Compound Ratio', latex: 'If $2A:3B:4C$, then $A:B:C = \\frac{1}{2}:\\frac{1}{3}:\\frac{1}{4}$' },
        ]
      },
      {
        name: 'Time, Speed & Distance',
        formulas: [
          { name: 'Basic Formula', latex: '$D = S \\times T$, $1 \\text{ m/s} = \\frac{18}{5} \\text{ km/h}$' },
          { name: 'Average Speed', latex: '$\\frac{2xy}{x+y}$ or $\\frac{\\text{Total Distance}}{\\text{Total Time}}$' },
          { name: 'Relative Speed', latex: '$S_1 \\pm S_2$' },
          { name: 'Opposite Direction', latex: 'Speed adds (relative speed)' },
          { name: 'Same Direction', latex: 'Diff. of speeds' },
          { name: 'Train Problems', latex: 'Length of both trains + distance for overtaking' },
          { name: 'Circular Tracks (Meeting)', latex: '$T = \\frac{L}{S_1 \\pm S_2}$', description: 'Relative time for first meeting' },
          { name: 'Circular Tracks (Start)', latex: '$LCM(L/S_1, L/S_2, \\dots)$', description: 'Meeting at starting point' },
          { name: 'Circular Tracks (Speeds)', latex: 'If speeds in ratio $a:b$, periods will meet at $\\frac{a+b}{a}$ distinct points (same direction)' },
          { name: 'Boats & Streams', latex: '$U = B-S, D = B+S \\Rightarrow B = \\frac{D+U}{2}, S = \\frac{D-U}{2}$' },
          { name: 'Linear Races', latex: 'A beats B by x m: $D_A=L, D_B=L-x$' },
          { name: 'Escalator Formula', latex: '$Steps = t(e \\pm s)$', description: 'e: escalator speed, s: person speed' },
          { name: 'Time & Distance Variations', latex: '$\\frac{m_1 a_1 h_1}{w_1} = \\frac{m_2 a_2 h_2}{w_2}$', description: 'LCM method is the best' },
        ]
      },
      {
        name: 'Mean, Median & Mode',
        formulas: [
          { name: 'Mean (Average)', latex: '$\\text{Mean} = \\frac{\\sum x_i}{n}$' },
          { name: 'Median (Odd n)', latex: 'Middle value when sorted' },
          { name: 'Median (Even n)', latex: 'Average of two middle values' },
          { name: 'Mode', latex: 'Most frequently occurring value' },
        ]
      },
      {
        name: 'Simple & Compound Interest',
        formulas: [
          { name: 'Simple Interest', latex: '$SI = \\frac{PRT}{100}$' },
          { name: 'Compound Interest', latex: '$A = P(1 + \\frac{R}{100})^T$ or $CI = A - P$' },
          { name: 'SI Installment', latex: '$P = \\frac{100A}{100T + RT(T-1)/2}$' },
          { name: 'CI Installment', latex: '$P(1 + \\frac{R}{100}) = x_1 + x_2(1 + \\frac{R}{100}) + \\dots + x_n(1 + \\frac{R}{100})^{n-1}$' },
          { name: 'CI Installment (Equal)', latex: '$P = \\frac{X}{1+r} + \\frac{X}{(1+r)^2} + \\dots$', description: 'X is the annual payment' },
          { name: 'Installment Concept', latex: 'If amt is doubled (or any equivalent), then use AGSI' },
          { name: 'Double/Triple Concept', latex: 'If Ex→P=100, if amt doubles in 5 years, then: 5yr→200, 10yr→400$21\\%$, 15yr→800' },
          { name: 'Diff. b/w CI & SI', latex: 'For 2 years: $D = P(\\frac{R}{100})^2$' },
          { name: 'Diff. b/w CI & SI (3 yrs)', latex: '$D = P(\\frac{R}{100})^2(\\frac{R}{100} + 3)$' },
          { name: 'Diff. b/w CI & SI (n yrs)', latex: '$D = P + P(1+r)^{n-1}$' },
          { name: 'Years to Double (CI)', latex: '$\\frac{72}{R}$ approx' },
          { name: 'CI Appreciation', latex: '$V = P(1+r/100)^n$' },
          { name: 'CI Depreciation', latex: '$V = P(1-r/100)^n$' },
          { name: 'SI-based Installments', latex: 'If getting same amt, then $P_1:P_2:P_3 = \\frac{1}{R_1T_1}:\\frac{1}{R_2T_2}:\\frac{1}{R_3T_3}$' },
          { name: 'CI-based (Pres case)', latex: 'If getting same amt: $P_1:P_2:P_3 = \\frac{1}{100+R_1T_1}:\\frac{1}{100+R_2T_2}:\\frac{1}{100+R_3T_3}$' },
        ]
      },
      {
        name: 'Profit & Loss',
        formulas: [
          { name: 'Percentage Change', latex: '$\\% \\text{ change} = \\frac{\\text{Change}}{\\text{Original}} \\times 100$' },
          { name: 'Net % Change', latex: '$a + b + \\frac{ab}{100}$', description: 'For successive changes' },
          { name: 'Successive Percentage', latex: '$a+b+ab/100$' },
          { name: 'Faulty Balance', latex: '$Gain \\% = \\frac{\\text{Error}}{\\text{True Value - Error}} \\times 100$' },
          { name: 'Discount & MP', latex: '$\\frac{MP}{CP} = \\frac{100+P\\%}{100-D\\%}$' },
          { name: 'Buy X Get Y Free', latex: '$Discount \\% = \\frac{Y}{X+Y} \\times 100$' },
          { name: 'Profit Formula', latex: '$CP(n) = SP(n-1)$', description: 'If SP of n items = CP of (n-1), then % profit' },
          { name: 'Overall Profit %', latex: 'If SP is same, $\\% \\text{ profit/loss on } b \\times \\frac{\\% \\text{ loss on } a}{b}$' },
          { name: 'Faulty Measure', latex: 'Uses less in value for ease in simplification' },
        ]
      },
      {
        name: 'Averages',
        formulas: [
          { name: 'Average', latex: '$\\text{Avg} = \\frac{\\sum}{N}$' },
          { name: 'AP Average', latex: 'If given an AP: $\\text{Avg} = \\frac{1}{2}(a_1 + a_n)$' },
          { name: 'Replacement in Group', latex: 'When one person replaces another: $\\text{Age of new} = \\text{Age of removed} \\pm \\frac{\\text{Change in avg}}{N}$' },
          { name: 'Weighted Average (First n)', latex: '$\\frac{\\sum n^2}{\\sum n}$ or $\\frac{2n^2 + n}{3}$' },
          { name: 'Weighted Average (Price)', latex: '$\\frac{P_1q_1 + P_2q_2}{q_1 + q_2}$', description: 'For price mixing' },
          { name: 'Ratio from Avg & Prices', latex: 'If ratio is given & avg price asked: $\\frac{q_1}{q_2}$ for exp/cheap' },
        ]
      },
      {
        name: 'Mixtures & Alligation',
        formulas: [
          { name: 'Allegation Rule', latex: '$\\frac{Q_1}{Q_2} = \\frac{A_2 - A_m}{A_m - A_1}$' },
          { name: 'Replacement Mixture', latex: '$Final = Initial(1 - \\frac{x}{V})^n$', description: 'x: vol removed, V: total vol' },
          { name: 'Removal & Replacement', latex: 'If in $Q$ units of mixture $A$ & liquid $B$, $R$ units of mixture is removed & replaced by an equal amount of $B$ (n times), then: $\\frac{\\text{Qty of A left}}{\\text{Original qty of A}} = (1 - \\frac{R}{Q})^n$' },
          { name: 'Removal (Liquid A only)', latex: 'If in $Q$ units of liquid $A$ only, $R$ units of $(B)$ is taken out & replaced by $B$ (n times), then: $\\frac{\\text{Quantity of A left}}{Q} = (1 - \\frac{R}{Q})^n$' },
        ]
      },
      {
        name: 'Time & Work',
        formulas: [
          { name: 'MDH Rule', latex: '$M_1D_1H_1/W_1 = M_2D_2H_2/W_2$' },
          { name: 'Pipe Filling', latex: '$1/T_{total} = 1/P_1 + 1/P_2 - 1/L$' },
        ]
      }
    ]
  },
  {
    id: 'trigonometry',
    title: 'Trigonometry',
    subTopics: [
      {
        name: 'Basic Trigonometric Formulas',
        formulas: [
          { name: 'Fundamental Square', latex: '$\\sin^2\\theta + \\cos^2\\theta = 1$' },
          { name: 'Sum/Diff Rules', latex: '$\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B$' },
          { name: 'Sine Rule', latex: '$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$' },
          { name: 'Cosine Rule', latex: '$c^2 = a^2 + b^2 - 2ab\\cos C$' },
        ]
      }
    ]
  },
  {
    id: 'geometry',
    title: 'Geometry',
    subTopics: [
      {
        name: 'Triangles',
        formulas: [
          { name: 'Area', latex: '$A = \\frac{1}{2}bh$' },
          { name: "Heron's Formula", latex: '$A = \\sqrt{s(s-a)(s-b)(s-c)}$ where $s = \\frac{a+b+c}{2}$' },
          { name: 'Pythagorean Theorem', latex: '$a^2 + b^2 = c^2$' },
          { name: "Stewart's Theorem", latex: '$man + dad = bmb + cnc$', description: 'For any cevian d' },
        ]
      },
      {
        name: 'Circles',
        formulas: [
          { name: 'Circumference', latex: '$C = 2\\pi r$' },
          { name: 'Area', latex: '$A = \\pi r^2$' },
          { name: 'Tangent-Secant property', latex: '$PT^2 = PA \\cdot PB$' },
        ]
      },
      {
        name: 'Straight Lines',
        formulas: [
          { name: 'Distance Formula', latex: '$\\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$' },
          { name: 'Section Formula', latex: '$(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n})$' },
          { name: 'Slope (m)', latex: '$\\tan \\theta = (y_2-y_1)/(x_2-x_1)$' },
        ]
      },
      {
        name: 'Quadrilaterals',
        formulas: [
          { name: 'Area of Cyclic Quad', latex: '$\\sqrt{(s-a)(s-b)(s-c)(s-d)}$' },
          { name: "Ptolemy's Theorem", latex: '$AC \\cdot BD = AB \\cdot CD + BC \\cdot AD$', description: 'For cyclic quadrilaterals' },
          { name: 'Interior Angles', latex: '$(n-2) \\times 180^{\\circ}$' },
        ]
      },
      {
        name: 'Solids',
        formulas: [
          { name: 'Cube Surface Area', latex: '$6a^2$' },
          { name: 'Cube Volume', latex: '$a^3$' },
          { name: 'Sphere Surface Area', latex: '$4\\pi r^2$' },
          { name: 'Sphere Volume', latex: '$\\frac{4}{3}\\pi r^3$' },
        ]
      },
      {
        name: 'Polygons',
        formulas: [
          { name: 'Interior Angle Sum', latex: '$(n-2) \\times 180^{\\circ}$' },
          { name: 'Exterior Angle Sum', latex: '$360^{\\circ}$' },
        ]
      }
    ]
  },
  {
    id: 'conic-sections',
    title: 'Conic Sections',
    subTopics: [
      {
        name: 'Parabola, Ellipse & Hyperbola',
        formulas: [
          { name: 'Parabola Standard', latex: '$y^2 = 4ax$' },
          { name: 'Ellipse Standard', latex: '$\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$' },
          { name: 'Hyperbola Standard', latex: '$\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$' },
        ]
      }
    ]
  },
  {
    id: 'modern-math',
    title: 'Modern Math',
    subTopics: [
      {
        name: 'Permutation & Combination',
        formulas: [
          { name: 'Permutation', latex: '$^nP_r = \\frac{n!}{(n-r)!}$' },
          { name: 'Combination', latex: '$^nC_r = \\frac{n!}{r!(n-r)!}$' },
          { name: 'Circular Arrangement', latex: '$(n-1)!$' },
          { name: 'Necklace / Garland', latex: '$(n-1)!/2$' },
          { name: 'Derangements', latex: '$n! [1 - 1/1! + 1/2! - \\dots + (-1)^n/n!]$' },
          { name: 'Beggars Method', latex: '$^{n+r-1}C_{r-1}$', description: 'Distributing n identical to r distinct' },
        ]
      },
      {
        name: 'Set Theory',
        formulas: [
          { name: 'Union', latex: '$A \\cup B$' },
          { name: 'Intersection', latex: '$A \\cap B$' },
          { name: 'Inclusion-Exclusion', latex: '$|A \\cup B \\cup C| = \\dots$' },
        ]
      },
      {
        name: 'Probability',
        formulas: [
          { name: 'Basic Probability', latex: '$P(E) = \\frac{\\text{Favorable}}{\\text{Total}}$' },
          { name: 'Conditional Prob', latex: '$P(A|B) = P(A \\cap B) / P(B)$' },
          { name: "Bayes' Theorem", latex: '$P(B_i|A) = \\frac{P(A|B_i)P(B_i)}{\\sum P(A|B_j)P(B_j)}$' },
          { name: 'Expectation', latex: '$E(x) = \\sum x_i P_i$' },
        ]
      },
      {
        name: 'Matrices & Determinants',
        formulas: [
          { name: '2x2 Determinant', latex: '$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc$' },
          { name: 'Matrix Multiplication', latex: 'Rows of first × Columns of second' },
        ]
      }
    ]
  },
  {
    id: 'logarithm',
    title: 'Logarithm',
    subTopics: [
      {
        name: 'Logarithmic Properties',
        formulas: [
          { name: 'Base Change', latex: '$\\log_a b = \\frac{\\ln b}{\\ln a}$' },
          { name: 'Log Addition', latex: '$\\log(mn) = \\log m + \\log n$' },
          { name: 'Log Subtraction', latex: '$\\log(m/n) = \\log m - \\log n$' },
          { name: 'Log Power', latex: '$\\log(m^n) = n\\log m$' },
        ]
      }
    ]
  },
  {
    id: 'binomial-theorem',
    title: 'Binomial Theorem',
    subTopics: [
      {
        name: 'Binomial Expansion',
        formulas: [
          { name: 'Binomial Theorem', latex: '$(a+b)^n = \\sum_{r=0}^{n} {^nC_r} a^{n-r}b^r$' },
          { name: 'General Term', latex: '$T_{r+1} = {^nC_r} a^{n-r}b^r$' },
        ]
      }
    ]
  },
  {
    id: 'number-systems',
    title: 'Number Systems',
    subTopics: [
      {
        name: 'Divisibility Rules',
        formulas: [
          { name: 'Divisibility by 3', latex: 'Sum of digits divisible by 3' },
          { name: 'Divisibility by 9', latex: 'Sum of digits divisible by 9' },
          { name: 'Divisibility by 11', latex: '$(\\sum \\text{odd place digits}) - (\\sum \\text{even place digits})$ divisible by 11' },
        ]
      },
      {
        name: 'Remainder & Cyclicity',
        formulas: [
          { name: "Fermat's Little Theorem", latex: '$a^{p-1} \\equiv 1 \\pmod p$ if $p$ is prime' },
          { name: 'Euler Totient Theorem', latex: '$a^{\\phi(n)} \\equiv 1 \\pmod n$ if $gcd(a,n)=1$' },
          { name: "Wilson's Theorem", latex: '$(p-1)! \\equiv -1 \\pmod p$ if $p$ is prime' },
          { name: 'Chinese Remainder Theorem', latex: 'Solves system of congruences $x \\equiv a_i \\pmod{n_i}$' },
          { name: 'Cyclicity (Units Digit)', latex: 'Power $n \\pmod 4$ for 2, 3, 7, 8; $n \\pmod 2$ for 4, 9' },
        ]
      },
      {
        name: 'Factorials & Properties',
        formulas: [
          { name: 'Factorial', latex: '$n! = n \\times (n-1) \\times \\dots \\times 1$' },
          { name: 'Power of Prime in n!', latex: '$E_p(n!) = [n/p] + [n/p^2] + [n/p^3] + \\dots$' },
          { name: 'Trailing Zeros in n!', latex: 'Power of 5 in n!' },
        ]
      },
      {
        name: 'HCF & LCM',
        formulas: [
          { name: 'HCF × LCM', latex: '$HCF(a,b) \\times LCM(a,b) = a \\times b$' },
          { name: 'Remainder model 1', latex: '$LCM(a,b,c)k + r$', description: 'Same remainder r in each case' },
          { name: 'Remainder model 2', latex: '$LCM(a,b,c)k - (a-r_1)$', description: 'Difference $(a-r_1) = (b-r_2)$ is constant' },
          { name: 'Remainder model 3', latex: '$HCF(a-b, b-c, c-a)$', description: 'Largest number leaving same remainder' },
          { name: 'HCF of Fractions', latex: '$HCF(num) / LCM(den)$' },
        ]
      },
      {
        name: 'Number Properties',
        formulas: [
          { name: 'Rational Numbers', latex: '$Q = \\{a/b : a, b \\in Z, b \\neq 0\\}$' },
          { name: 'Prime Number Property', latex: 'All primes > 3 are of form $6n \\pm 1$' },
          { name: 'Number of Divisors', latex: '$N = p_1^{a} p_2^{b} \\Rightarrow (a+1)(b+1)$' },
          { name: 'Product of Divisors', latex: '$N^{(Total Divisors)/2}$' },
          { name: 'Sum of Divisors', latex: '$\\frac{p_1^{a+1}-1}{p_1-1} \\times \\dots$' },
        ]
      }
    ]
  },
  {
    id: 'lrdi',
    title: 'LRDI',
    subTopics: [
      {
        name: 'Data Interpretation',
        formulas: [
          { name: 'Percentage Calculation', latex: '$\\frac{\\text{Part}}{\\text{Whole}} \\times 100$' },
          { name: 'Percentage Change', latex: '$\\frac{\\text{New - Old}}{\\text{Old}} \\times 100$' },
          { name: 'Average', latex: '$\\frac{\\text{Sum of values}}{\\text{Number of values}}$' },
        ]
      },
      {
        name: 'Logical Reasoning',
        formulas: [
          { name: 'Arrangement Principle', latex: 'Use grid/table method for allocations' },
          { name: 'Tournament Formula', latex: 'Total matches = $\\frac{n(n-1)}{2}$ for round-robin' },
        ]
      }
    ]
  }
];

export const QuantVault = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = formulaData.map(category => {
    const filteredSubTopics = category.subTopics.map(sub => ({
      ...sub,
      formulas: sub.formulas.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.latex.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(sub => sub.formulas.length > 0);

    return {
      ...category,
      subTopics: filteredSubTopics
    };
  }).filter(category => category.subTopics.length > 0);

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative group max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-black group-focus-within:text-primary transition-colors" />
        </div>
        <Input
          placeholder="Search for formulas or sub-topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 h-14 border-4 border-black rounded-none shadow-brutal-sm focus:shadow-brutal-md focus:bg-primary/5 transition-all font-black text-lg placeholder:text-zinc-400 placeholder:italic"
        />
      </div>

      {/* Formula Categories */}
      <Accordion type="multiple" defaultValue={['number-systems']} className="space-y-6">
        {filteredCategories.map((category, catIndex) => (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="border-4 border-border bg-card shadow-brutal-sm overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted transition-all data-[state=open]:border-b-4 data-[state=open]:border-border group">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center border-2 border-black font-black text-xs uppercase shadow-brutal-sm group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all",
                  catIndex % 3 === 0 ? "bg-primary" : catIndex % 3 === 1 ? "bg-secondary" : "bg-accent"
                )}>
                  {category.title.substring(0, 2)}
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-black text-xl uppercase tracking-tight leading-none mb-1">{category.title}</span>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">
                    {category.subTopics.length} Sections • {category.subTopics.reduce((acc, sub) => acc + sub.formulas.length, 0)} Rules
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 bg-muted/50">
              <div className="divide-y-4 divide-black/10">
                {category.subTopics.map((sub, subIndex) => (
                  <div key={subIndex} className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-6 w-1 bg-black" />
                      <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">{sub.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sub.formulas.map((formula, fIndex) => (
                        <div
                          key={fIndex}
                          className="p-5 bg-card border-3 border-border group hover:bg-card transition-colors shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal-md"
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-black text-xs uppercase tracking-tight text-muted-foreground">{formula.name}</h4>
                          </div>
                          <div className="text-lg md:text-xl py-3 flex items-center justify-center bg-muted border-2 border-dashed border-border overflow-x-auto min-h-[70px]">
                            <div className="px-3">
                              <Latex>{formula.latex}</Latex>
                            </div>
                          </div>
                          {formula.description && (
                            <p className="text-[10px] font-black uppercase text-muted-foreground mt-3 italic border-l-2 border-black pl-2 leading-relaxed opacity-60">
                              {formula.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filteredCategories.length === 0 && (
        <div className="text-center py-20 border-4 border-dashed border-black/20 rounded bg-accent/5">
          <p className="text-xl font-black uppercase italic opacity-30">Formula not found in the archives</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-6 py-2 bg-black text-white font-black uppercase text-sm hover:bg-primary hover:text-black transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
};
