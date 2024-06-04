import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { mockFetch } from './mockFetch';
import { HeaderComponent } from '../HeaderComponent';
import { ErrorFromValidation, ErrorWithHTML, ValidationError } from '../../backend/fetchWithErrorHandling';
import { ErrorFallback } from '../ErrorFallback';

// Sicherstellen, dass wir mit fetch arbeiten.
// Das fetch wird in beforeEach gemockt.
process.env.REACT_APP_REAL_FETCH = "true";

// 1000 is the default anyway
const MAX_TIMEOUT_FOR_FETCH_TESTS = Number.parseInt(process.env.MAX_TIMEOUT_FOR_FETCH_TESTS || "2000");

function waitForLonger(callback: () => void | Promise<void>) {
    return waitFor(callback, { timeout: MAX_TIMEOUT_FOR_FETCH_TESTS });
}

const orgLog = console.log;
const orgError = console.error;

beforeEach(() => {
    console.log = () => { };
    console.error = () => { };
    mockFetch(); // nicht eingeloggt, Einloggen prinzipiell möglich aber hier nicht getestet.
});
afterEach(() => {
    cleanup(); // Löschen des internen React-Status, damit wirklich alles neu gerendert wird und nichts doppelt erscheint.
    console.log = orgLog;
    console.error = orgError;
});


test('App', async () => {
    render(<MemoryRouter initialEntries={["/"]}>
        <App />
    </MemoryRouter>);

    await waitForLonger(() => {
        const title = screen.getAllByText(/Castorp/i);
        expect(title.length).toBeGreaterThanOrEqual(2);
    });
});

test('Prefs', async () => {
    render(<MemoryRouter initialEntries={["/prefs"]}>
        <App />
    </MemoryRouter>);

    await waitForLonger(() => {
        const title = screen.getAllByText(/Pref/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Admin', async () => {
    render(<MemoryRouter initialEntries={["/admin"]}>
        <App />
    </MemoryRouter>);

    await waitForLonger(() => {
        const title = screen.getAllByText(/Admin/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Protokoll 101', async () => {
    render(<MemoryRouter initialEntries={["/protokoll/101"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/Hans Castorp/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
    await waitForLonger(() => {
        const title = screen.getAllByText(/Wasser/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Invalid Protokoll-ID', async () => {
    render(<MemoryRouter initialEntries={["/protokoll/abc"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/Validation error/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Eintrag 201', async () => {
    render(<MemoryRouter initialEntries={["/eintrag/201"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/Tee/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Eintrag 202', async () => {
    render(<MemoryRouter initialEntries={["/eintrag/202"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/Wasser/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Eintrag 203', async () => {
    render(<MemoryRouter initialEntries={["/eintrag/203"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/Sekt/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Eintrag not found', async () => {
    render(<MemoryRouter initialEntries={["/eintrag/440044"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/404/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('Invalid Eintrag-ID', async () => {
    render(<MemoryRouter initialEntries={["/eintrag/abc"]}>
        <App />
    </MemoryRouter>);
    await waitForLonger(() => {
        const title = screen.getAllByText(/Validation error/i);
        expect(title.length).toBeGreaterThanOrEqual(1);
    });
});

test('renders header links', () => {
    render(
        <MemoryRouter>
            <HeaderComponent />
        </MemoryRouter>
    );

    // Check if the Navbar Brand is rendered
    expect(screen.getByText('Protokollverwaltung für Patienten')).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Preferences')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
});

test('renders validation error details', () => {
    const validationErrors: ValidationError[] = [
        {
            msg: 'Error 1',
            path: 'field1',
            location: 'body',
            value: 'value1',
        },
        {
            msg: 'Error 2',
            path: 'field2',
            location: 'params',
            value: 'value2',
        },
    ];

    const errorFromValidation = new ErrorFromValidation(400, validationErrors);

    render(<ErrorFallback error={errorFromValidation} />);

    expect(screen.getByText('Validation Error')).toBeInTheDocument();
});

test('renders HTML error', () => {
    const htmlError = new ErrorWithHTML(404, '<div>Some HTML content</div>');

    render(<ErrorFallback error={htmlError} />);

    expect(screen.getByText('HTML Error')).toBeInTheDocument();
    expect(screen.getByText('Some HTML content')).toBeInTheDocument();
});
