class Rule {
    static key_map_easy_module = {
        'A': 10, 'Q': 10, 'Z': 10,
        'S': 9, 'W': 9, 'X': 9,
        'D': 8, 'E': 8, 'C': 8,
        'F': 7, 'R': 7, 'V': 7,
        'G': 6, 'T': 6, 'B': 6,
        'H': 5, 'Y': 5, 'N': 5,
        'J': 4, 'U': 4, 'M': 4,
        'K': 3, 'I': 3, '<': 3,
        'L': 2, 'O': 2, '>': 2,
        ';': 1, 'P': 1, '?': 1,
    }
    static reverse_module = {
    10: 'A', 9: 'S', 8: 'D', 7: 'F', 6: 'G',
    5: 'H', 4: 'J', 3: 'K', 2: 'L', 1: ';',
}

    constructor() {

    }

    static easy_module(key) {
        if(this.key_map_easy_module[key] === undefined){
            return "baka"; // -------------------
        }
        return this.reverse_module[this.key_map_easy_module[key]];
    }

}