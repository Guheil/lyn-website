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
        <StyledInner>
          <span className="intro-rule" aria-hidden="true" />
          <h1>Business credentials available for review.</h1>
          <p>
            Public-safe copies of business registrations, permits, and owner documents for Lyn Bactad will be presented here to establish the legitimacy of the property group.
          </p>
        </StyledInner>
      </StyledCredentialsIntro>

      <StyledSection>
        <StyledInner>
          <StyledCredentialsNote>
            <strong>Placeholder documents</strong>
            <p>
              The samples below show the intended presentation only. They are not official credentials and must be replaced with reviewed, redacted copies before launch.
            </p>
          </StyledCredentialsNote>
          <CredentialGallery />
        </StyledInner>
      </StyledSection>
    </>
  );
}
