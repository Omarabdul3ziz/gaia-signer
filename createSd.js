const sdTemplate = require('./config/self-description.json')
const fs = require('fs');
const crypto = require('crypto');


function createSd(data) {
    let sd = sdTemplate;

    sd['@id'] = "https://hanafy.threefold.io/.well-known/participant/"
    sd.credentialSubject.id = "did:web:hanafy.threefold.io"
    sd.credentialSubject['gx-participant:name']['@value'] = data['name'] || "TF"
    sd.credentialSubject['gx-participant:legalName']['@value'] = data['name'] || "Threefold"

    sd.credentialSubject['gx-participant:registrationNumber']['@value'] = data['registrationNumber'] || "123456789"

    sd.credentialSubject['gx-participant:headquarterAddress']["gx-participant:country"]['@value'] = data['country'] || "BEL"

    sd.credentialSubject['gx-participant:legalAddress']["gx-participant:country"]['@value'] = data['country'] || "BEL"

    const terms = `
    The PARTICIPANT signing the Self-Description agrees as follows:
    - to update its descriptions about any changes, be it technical, organisational, or legal - especially but not limited to contractual in regards of the indicated attributes present in the descriptions.
    - wrongful statements will reflect a breach of contract and may cumulate to unfair competitive behaviour.
    - in cases of systematic and deliberate misrepresentations, Gaia-X Association is, without prejudice to claims and rights under the applicable law, entitled to take actions as defined in this document Architecture document - Operation model chapter - Self-Description Remediation section.
    
    Alongside, the PARTICIPANT signing the Self-Description is aware and accepts that:
    - the SERVICE OFFERING will be delisted where Gaia-X Association becomes aware of any inaccurate statements in regards of the SERVICE OFFERING which result in a non-compliance with the Trust Framework and Policy Rules document.`
    const hashedTerms = crypto.createHash('sha512').update(terms).digest('hex');
    console.log(hashedTerms)
    sd.credentialSubject['gx-service-offering:TermsAndConditions']['gx-service-offering:hash']['@value'] = data['termsHash'] || hashedTerms


    fs.writeFileSync('./config/self-description.json', JSON.stringify(sd, null, 4))
}

module.exports = createSd