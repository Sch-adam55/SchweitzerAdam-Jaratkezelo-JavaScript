class NegativKesesException extends Error {
    constructor(message) {
        super(message);
        this.name = "NegativKesesException";
    }
}

class JaratKezelo {
    constructor() {
        this.jaratok = new Map();
    }

    ujJarat(jaratSzam, repterHonnan, repterHova, indulas) {
        if (this.jaratok.has(jaratSzam)) {
            throw new Error("A járatszám már létezik");
        }
        this.jaratok.set(jaratSzam, {
            repterHonnan,
            repterHova,
            indulas,
            keses: 0
        });
    }

    keses(jaratSzam, keses) {
        if (!this.jaratok.has(jaratSzam)) {
            throw new Error("Nem létező járat");
        }
        const jarat = this.jaratok.get(jaratSzam);
        jarat.keses += keses;
        if (jarat.keses < 0) {
            jarat.keses -= keses;  // Undo the addition
            throw new NegativKesesException("A késés nem lehet negatív");
        }
    }

    mikorIndul(jaratSzam) {
        if (!this.jaratok.has(jaratSzam)) {
            throw new Error("Nem létező járat");
        }
        const jarat = this.jaratok.get(jaratSzam);
        const indulas = new Date(jarat.indulas.getTime() + jarat.keses * 60000); // keses percekben van
        return indulas;
    }

    jaratokRepuloterrol(repter) {
        const result = [];
        for (const [jaratSzam, jarat] of this.jaratok) {
            if (jarat.repterHonnan === repter) {
                result.push(jaratSzam);
            }
        }
        return result;
    }
}

export { JaratKezelo, NegativKesesException };
