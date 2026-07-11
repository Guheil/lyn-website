import { CredentialGallery } from './CredentialGallery';
import {
  StyledCredentialsIntro,
  StyledCredentialsNote,
  StyledInner,
  StyledSection,
} from './elements';

export function CredentialsPage() {
  return (
    <>
      <StyledCredentialsIntro>
        <StyledInner className="credentials-intro-grid">
          <h1>Credentials and registrations.</h1>
          <div className="credentials-intro-copy">
            <p>
              Public-facing documents connected to the ownership and operation of the property group are presented here for review.
            </p>
            <div className="credentials-intro-detail">
              <span>Lyn Bactad Property Group</span>
              <span>Redacted public copies only</span>
            </div>
          </div>
        </StyledInner>
      </StyledCredentialsIntro>

      <StyledSection>
        <StyledInner>
          <StyledCredentialsNote>
            <strong>Preview status</strong>
            <p>
              The documents below are design placeholders. They are not official credentials and must be replaced with reviewed, redacted copies before the page is published publicly.
            </p>
          </StyledCredentialsNote>
          <CredentialGallery />
        </StyledInner>
      </StyledSection>
    </>
  );
}
