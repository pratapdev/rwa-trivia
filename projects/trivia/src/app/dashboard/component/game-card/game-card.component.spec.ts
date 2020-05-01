import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { GameCardComponent } from './game-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Utils } from 'shared-library/core/services';
import { User, Game, PlayerMode, GameStatus } from 'shared-library/shared/model';
import { AppState, appState } from '../../../store';
import { TEST_DATA } from 'shared-library/testing/test.data';
import { CoreState } from 'shared-library/core/store';
import { MatSnackBarModule } from '@angular/material';

describe('GameCardComponent', () => {

    let component: GameCardComponent;
    let fixture: ComponentFixture<GameCardComponent>;
    let spy: any;
    let user: User;
    let mockStore: MockStore<AppState>;
 
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameCardComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Utils, useValue: {
                    getTimeDifference(turnAt: number) {
                        return 1588313130838 - turnAt;
                    },
                    convertIntoDoubleDigit(digit: Number) {
                        return (digit < 10) ? `0${digit}` : `${digit}`;
                    }
                }},
                provideMockStore( {
                    selectors: [
                      {
                        selector: appState.coreState,
                        value: {}
                      }
                    ]
                  })
            ],
            imports: [ MatSnackBarModule ]
        });

    }));

    beforeEach(() => {
        // create component
        fixture = TestBed.createComponent(GameCardComponent);
        // mock data
        mockStore = TestBed.get(Store);
        spy = spyOn(mockStore, 'dispatch');

        component = fixture.debugElement.componentInstance;

        const dbModel = TEST_DATA.game[0];
        component.game = Game.getViewModel(dbModel);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
        component.isHidePlayNow = false;
        component.applicationSettings = TEST_DATA.applicationSettings;

        component.categoryDict = TEST_DATA.categoryDictionary;
        component.user = TEST_DATA.userList[0];
        component.PlayerMode = PlayerMode;
        component.gameStatus = GameStatus;
        const otherUser = { ...TEST_DATA.userList[1] };
        component.otherUserId = 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1';
        component.userDict = {'4kFa6HRvP5OhvYXsH9mEsRrXj4o2': user, 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1': otherUser};
        component.ngOnInit();
        fixture.detectChanges();
        expect(fixture).toMatchSnapshot();
    });

    it('capitalizeFirstLetter function should capitalize first letter', () => {
        const categoryName = 'infrastructure/networking';
        const categoryNameWithCapitalizedFirstLetter = component.capitalizeFirstLetter(categoryName);
        expect(categoryNameWithCapitalizedFirstLetter).toEqual('Infrastructure/networking');
    });

    it(`User should be undefined when component is created`, () => {
        expect(component.user).toBe(undefined);
    });

    it('User should be set when user is logged in', () => {
        user = { ...TEST_DATA.userList[0] };
        mockStore.overrideSelector<AppState, Partial<CoreState>>(appState.coreState, {
            user: user
          });
          mockStore.refreshState();
          expect(component.user).toBe(user);
      });

      it('User dictionary should be set when values are emitted', () => {
        user = { ...TEST_DATA.userList[0] };
        const otherUser = { ...TEST_DATA.userList[1] };
        const userDict = {'4kFa6HRvP5OhvYXsH9mEsRrXj4o2': user, 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1': otherUser};
        mockStore.overrideSelector<AppState, Partial<CoreState>>(appState.coreState, {
            userDict: userDict
          });
          mockStore.refreshState();
          expect(component.userDict).toBe(userDict);
      });


    it('remaining time should be 2 hr 30 min', (async () => {

        component.isHidePlayNow = false;
        component.applicationSettings = TEST_DATA.applicationSettings;

        component.categoryDict = TEST_DATA.categoryDictionary;
        component.user = TEST_DATA.userList[0];
        component.PlayerMode = PlayerMode;
        component.gameStatus = GameStatus;
        const otherUser = { ...TEST_DATA.userList[1] };
        component.otherUserId = 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1';
        component.userDict = {'4kFa6HRvP5OhvYXsH9mEsRrXj4o2': user, 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1': otherUser};
        component.updateRemainingTime();

        await new Promise((r) => setTimeout(r, 2000));
        expect(component.remainingMinutes).toBe('30');
        expect(component.remainingHours).toBe('02');
    }));

    it('remaining time should be 0 hr 0 min', (async () => {

        component.isHidePlayNow = false;
        component.applicationSettings = TEST_DATA.applicationSettings;
        const dbModel = TEST_DATA.game[1];
        component.game = Game.getViewModel(dbModel);
        component.categoryDict = TEST_DATA.categoryDictionary;
        component.user = TEST_DATA.userList[0];
        component.PlayerMode = PlayerMode;
        component.gameStatus = GameStatus;
        const otherUser = { ...TEST_DATA.userList[1] };
        component.otherUserId = 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1';
        component.userDict = {'4kFa6HRvP5OhvYXsH9mEsRrXj4o2': user, 'yP7sLu5TmYRUO9YT4tWrYLAqxSz1': otherUser};
        component.updateRemainingTime();

        await new Promise((r) => setTimeout(r, 2000));
        expect(component.remainingMinutes).toBe('00');
        expect(component.remainingHours).toBe('00');
    }));

});
